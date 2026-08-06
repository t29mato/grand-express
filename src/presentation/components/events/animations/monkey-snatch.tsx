/**
 * 寺の猿に眼鏡を持っていかれる。
 *
 * 石の欄干に座った猿の腕が伸びて、旅人の顔から眼鏡がすっ飛ぶ。
 * 旅人は口を開けて手を伸ばすが、眼鏡はもう猿の手のなか。
 */
export function MonkeySnatch() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 寺の境内 */}
      <rect width="400" height="210" fill="#4a6a86" />

      {/* 祠と塔 */}
      <path d="M298,104 L304,54 Q322,26 340,54 L346,104 z" fill="#9a7c4e" />
      <g fill="#8a6c40">
        <rect x="302" y="66" width="42" height="5" />
        <rect x="300" y="82" width="46" height="5" />
      </g>
      <rect x="318" y="16" width="6" height="12" fill="#c98a12" />
      <circle cx="321" cy="14" r="6" fill="#f5b31c" />

      {/* 石の欄干 */}
      <rect x="150" y="116" width="250" height="56" fill="#8a7048" />
      <g fill="#7a6240">
        <rect x="166" y="120" width="10" height="46" />
        <rect x="196" y="120" width="10" height="46" />
        <rect x="226" y="120" width="10" height="46" />
        <rect x="342" y="120" width="10" height="46" />
        <rect x="372" y="120" width="10" height="46" />
      </g>
      <rect x="150" y="104" width="250" height="13" fill="#b89a6a" />
      <rect x="150" y="104" width="250" height="4" fill="#cdb083" />

      {/* 境内の石畳 */}
      <rect y="172" width="400" height="38" fill="#6b5a3f" />
      <rect y="172" width="400" height="4" fill="#7d6a4b" />

      {/* 見物している小猿 */}
      <g className="mksnat-watcher">
        <ellipse cx="374" cy="90" rx="13" ry="12" fill="#7a6248" />
        <circle cx="366" cy="76" r="9" fill="#8a7154" />
        <ellipse cx="362" cy="79" rx="6" ry="5" fill="#c9a48a" />
        <circle cx="358" cy="74" r="1.6" fill="#241a12" />
        <circle cx="365" cy="74" r="1.6" fill="#241a12" />
        <circle cx="374" cy="70" r="3.5" fill="#7a6248" />
      </g>

      {/* 欄干の猿 */}
      <g>
        <path
          className="mksnat-tail"
          d="M304,98 Q340,94 334,64"
          fill="none"
          stroke="#7a6248"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="294" cy="88" rx="21" ry="19" fill="#8a7154" />
        <ellipse cx="302" cy="98" rx="14" ry="10" fill="#7a6248" />
        <rect x="286" y="100" width="9" height="8" rx="4" fill="#7a6248" />
        <circle cx="266" cy="52" r="5" fill="#7a6248" />
        <circle cx="292" cy="54" r="5" fill="#7a6248" />
        <circle cx="279" cy="64" r="15" fill="#8a7154" />
        <ellipse cx="272" cy="68" rx="10" ry="9" fill="#c9a48a" />
        <circle cx="269" cy="61" r="2.2" fill="#241a12" />
        <circle cx="278" cy="61" r="2.2" fill="#241a12" />
        <ellipse cx="270" cy="72" rx="4" ry="2.5" fill="#8a6a52" />
      </g>

      {/* 伸びる腕 */}
      <g transform="translate(272,80)">
        <rect
          className="mksnat-arm"
          x="-96"
          y="-5"
          width="96"
          height="10"
          rx="5"
          fill="#8a7154"
        />
        <g className="mksnat-paw">
          <ellipse rx="9" ry="8" fill="#7a6248" />
          <rect x="-11" y="-7" width="8" height="4" rx="2" fill="#8a7154" />
          <rect x="-12" y="-2" width="9" height="4" rx="2" fill="#8a7154" />
          <rect x="-11" y="3" width="8" height="4" rx="2" fill="#8a7154" />
        </g>
      </g>

      {/* 眼鏡を取られた旅人 */}
      <g>
        <rect x="80" y="118" width="60" height="92" rx="16" fill="#3a7a4a" />
        <circle cx="108" cy="88" r="27" fill="#f6efe2" />
        <path
          d="M81,88 a27,27 0 0 1 54,-4 l-10,4 -14,-7 -13,8 -10,-4 z"
          fill="#2a1f18"
        />
        <path d="M133,86 l7,7 -7,3 z" fill="#e6d9c2" />
        <circle cx="122" cy="82" r="3.2" fill="#241a12" />
        <ellipse className="mksnat-gasp" cx="126" cy="102" rx="5" ry="6" fill="#8a3a3a" />
        {/* 追いかける手 */}
        <g className="mksnat-grab">
          <rect x="138" y="64" width="34" height="10" rx="5" fill="#3a7a4a" />
          <circle cx="172" cy="69" r="8" fill="#f6efe2" />
        </g>
      </g>

      {/* すっ飛んだ眼鏡 */}
      <g className="mksnat-glasses">
        <circle
          cx="-11"
          cy="0"
          r="9"
          fill="#cfe6f5"
          fillOpacity="0.55"
          stroke="#241a12"
          strokeWidth="3"
        />
        <circle
          cx="11"
          cy="0"
          r="9"
          fill="#cfe6f5"
          fillOpacity="0.55"
          stroke="#241a12"
          strokeWidth="3"
        />
        <rect x="-3" y="-2" width="6" height="3" fill="#241a12" />
        <rect x="-30" y="-6" width="11" height="3" rx="1.5" fill="#241a12" />
        <rect x="19" y="-6" width="11" height="3" rx="1.5" fill="#241a12" />
      </g>

      <style>{`
        .mksnat-arm { transform: scaleX(1); transform-box: fill-box; transform-origin: 100% 50%; animation: mksnat-stretch 3s ease-out infinite; }
        .mksnat-paw { transform: translate(-96px, 0); animation: mksnat-reach 3s ease-out infinite; }
        .mksnat-glasses { transform: translate(150px, 68px) rotate(-18deg); animation: mksnat-fly 3s ease-out infinite; }
        .mksnat-grab { animation: mksnat-after 3s ease-out infinite; transform-origin: 138px 69px; }
        .mksnat-gasp { animation: mksnat-shout 3s ease-out infinite; transform-box: fill-box; transform-origin: 50% 50%; }
        .mksnat-tail { animation: mksnat-curl 2.2s ease-in-out infinite; transform-origin: 306px 96px; }
        .mksnat-watcher { animation: mksnat-peer 2.6s ease-in-out infinite; transform-origin: 372px 96px; }
        @keyframes mksnat-stretch {
          0%, 8% { transform: scaleX(0.26); }
          30%, 100% { transform: scaleX(1); }
        }
        @keyframes mksnat-reach {
          0%, 8% { transform: translate(-25px, 0); }
          30%, 100% { transform: translate(-96px, 0); }
        }
        @keyframes mksnat-fly {
          0% { transform: translate(120px, 84px) rotate(0deg); opacity: 0; }
          9% { transform: translate(120px, 84px) rotate(0deg); opacity: 1; }
          32% { transform: translate(150px, 68px) rotate(-18deg); opacity: 1; }
          52%, 94% { transform: translate(176px, 74px) rotate(-26deg); opacity: 1; }
          100% { transform: translate(176px, 74px) rotate(-26deg); opacity: 0; }
        }
        @keyframes mksnat-after {
          0%, 14% { transform: rotate(18deg); }
          40%, 100% { transform: rotate(-6deg); }
        }
        @keyframes mksnat-shout {
          0%, 10% { transform: scale(0.4); }
          26%, 100% { transform: scale(1); }
        }
        @keyframes mksnat-curl {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes mksnat-peer {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, -2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mksnat-arm, .mksnat-paw, .mksnat-glasses, .mksnat-grab, .mksnat-gasp,
          .mksnat-tail, .mksnat-watcher { animation: none; }
        }
      `}</style>
    </svg>
  );
}
