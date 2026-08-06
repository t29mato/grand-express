/**
 * 坑道の落盤。
 *
 * 頭上の支保工がひび割れ、坑内が土埃で満ちる。その日の稼ぎの袋も土砂の下。
 *   - 天井の亀裂が走り、割れた梁が上下に軋む
 *   - 岩が転がり落ち、土埃が手前へ膨らんでくる
 *   - 鉱夫はヘッドランプを振りながら左へ逃げる
 */
export function BoliviaCollapse() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 坑道の岩 */}
      <rect width="400" height="210" fill="#20191f" />
      <path
        d="M0,0 L400,0 L400,52 L356,44 L318,58 L272,40 L226,56 L180,42 L134,58 L86,44 L40,58 L0,46z"
        fill="#352730"
      />
      <path d="M0,46 L0,176 L30,176 L22,124 L38,92 L16,64z" fill="#2c2029" />
      <path d="M400,52 L400,176 L372,176 L380,120 L366,90 L390,66z" fill="#2c2029" />

      {/* 奥の坑道 */}
      <path d="M228,176 L228,96 A48,42 0 0 1 324,96 L324,176z" fill="#140e14" />

      {/* 天井の亀裂 */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          className="coll-crack"
          d="M180,50 L212,38 L232,50 L262,34 L288,48 L318,36 L344,50 L376,42"
          stroke="#8a7460"
          strokeWidth="8"
        />
        <path
          className="coll-crack"
          d="M180,50 L212,38 L232,50 L262,34 L288,48 L318,36 L344,50 L376,42"
          stroke="#150f16"
          strokeWidth="3"
        />
      </g>

      {/* 割れた支保工 */}
      <g className="coll-beam-l">
        <rect x="204" y="58" width="72" height="17" fill="#6b4f34" />
        <path d="M276,58 L288,64 L276,68 L286,71 L276,75z" fill="#6b4f34" />
      </g>
      <g className="coll-beam-r">
        <rect x="290" y="58" width="66" height="17" fill="#5d4430" />
        <path d="M290,58 L278,63 L290,66 L280,70 L290,75z" fill="#5d4430" />
      </g>
      <rect className="coll-post-l" x="216" y="74" width="15" height="102" fill="#6b4f34" />
      <rect className="coll-post-r" x="322" y="74" width="15" height="102" fill="#5d4430" />

      {/* 落ちてくる岩 */}
      <g fill="#6f6753">
        <path className="coll-rock coll-rock-a" d="M270,84 L284,80 L290,94 L276,100 L266,93z" />
        <path className="coll-rock coll-rock-b" d="M300,78 L311,75 L316,86 L305,91 L297,85z" />
        <path className="coll-rock coll-rock-c" d="M244,88 L253,86 L257,95 L248,99 L242,93z" />
      </g>

      {/* 坑道の床とレール */}
      <rect y="174" width="400" height="36" fill="#43342a" />
      <rect y="174" width="400" height="4" fill="#584535" />
      <g fill="#5a4636">
        <rect x="6" y="188" width="14" height="14" />
        <rect x="52" y="188" width="14" height="14" />
        <rect x="98" y="188" width="14" height="14" />
        <rect x="144" y="188" width="14" height="14" />
        <rect x="190" y="188" width="14" height="14" />
      </g>
      <g fill="#7d786f">
        <rect y="188" width="400" height="3" />
        <rect y="200" width="400" height="3" />
      </g>

      {/* 埋まった売り上げの袋 */}
      <g>
        <path d="M252,178 L258,142 C258,134 292,134 292,142 L298,178z" fill="#d8c9a8" />
        <rect x="264" y="130" width="22" height="10" rx="5" fill="#a8916e" />
        <circle cx="275" cy="158" r="11" fill="#f5b31c" />
        <circle cx="275" cy="158" r="5" fill="#d89a12" />
      </g>
      <circle className="coll-coin coll-coin-a" cx="240" cy="152" r="7" fill="#f5b31c" />
      <circle className="coll-coin coll-coin-b" cx="308" cy="158" r="6" fill="#f5b31c" />

      {/* 積もる土砂 */}
      <path d="M206,178 Q246,140 280,152 Q322,166 352,178z" fill="#6b5a3a" />
      <g fill="#57503f">
        <circle cx="236" cy="166" r="11" />
        <circle cx="276" cy="160" r="13" />
        <circle cx="314" cy="170" r="10" />
      </g>

      {/* 立ちこめる土埃 */}
      <g fill="#c2ae90">
        <g className="coll-dust coll-dust-a" opacity="0.42">
          <circle cx="206" cy="132" r="22" />
          <circle cx="232" cy="142" r="16" />
          <circle cx="186" cy="146" r="14" />
        </g>
        <g className="coll-dust coll-dust-b" opacity="0.32">
          <circle cx="160" cy="150" r="18" />
          <circle cx="184" cy="158" r="13" />
          <circle cx="142" cy="160" r="11" />
        </g>
        <g className="coll-dust coll-dust-c" opacity="0.36">
          <circle cx="252" cy="116" r="20" />
          <circle cx="276" cy="126" r="14" />
          <circle cx="232" cy="126" r="12" />
        </g>
        <g className="coll-dust coll-dust-d" opacity="0.24">
          <circle cx="130" cy="128" r="15" />
          <circle cx="150" cy="136" r="11" />
        </g>
      </g>

      {/* 逃げる鉱夫 */}
      <g className="coll-miner">
        <g transform="translate(96,176)">
          <rect className="coll-leg-a" x="-11" y="-24" width="9" height="26" rx="4" fill="#2e2a38" />
          <rect className="coll-leg-b" x="2" y="-24" width="9" height="26" rx="4" fill="#2e2a38" />
          <rect x="-13" y="-56" width="26" height="36" rx="8" fill="#3f6bb0" />
          <rect x="-15" y="-46" width="24" height="7" rx="3.5" fill="#e05252" transform="rotate(-24 -3 -43)" />
          <circle cx="-2" cy="-64" r="12" fill="#c98a5e" />
          <path d="M-16,-66 a14,13 0 0 1 28,0z" fill="#f5b31c" />
          <rect x="-18" y="-68" width="30" height="6" rx="3" fill="#e0a418" />
          <circle className="coll-lamp" cx="-15" cy="-70" r="4" fill="#f5e08a" />
          <rect x="-8" y="-58" width="7" height="4" rx="2" fill="#e05252" />
        </g>
        <path className="coll-ray" d="M78,104 L18,84 L18,132 L78,116z" fill="#f5e08a" opacity="0.2" />
      </g>

      {/* 揺れるランタン */}
      <g className="coll-lantern">
        <rect x="222" y="76" width="3" height="16" fill="#4a4038" />
        <rect x="214" y="90" width="19" height="22" rx="4" fill="#5f5548" />
        <rect x="217" y="94" width="13" height="14" fill="#f5b31c" />
      </g>

      <style>{`
        .coll-crack { stroke-dasharray: 230; animation: coll-split 2.6s ease-out infinite; }
        .coll-beam-l { transform-box: fill-box; transform-origin: 0 50%; animation: coll-sag-l 2.6s ease-in-out infinite; }
        .coll-beam-r { transform-box: fill-box; transform-origin: 100% 50%; animation: coll-sag-r 2.6s ease-in-out infinite; }
        .coll-post-l { transform-box: fill-box; transform-origin: 50% 100%; animation: coll-lean 2.6s ease-in-out infinite; }
        .coll-post-r { transform-box: fill-box; transform-origin: 50% 100%; animation: coll-lean 2.6s ease-in-out infinite reverse; }
        .coll-rock { transform-box: fill-box; transform-origin: 50% 50%; }
        .coll-rock-a { animation: coll-drop 2.6s ease-in infinite; }
        .coll-rock-b { animation: coll-drop 2.6s ease-in infinite; animation-delay: -0.9s; }
        .coll-rock-c { animation: coll-drop 2.6s ease-in infinite; animation-delay: -1.7s; }
        .coll-dust { transform-box: fill-box; transform-origin: 50% 50%; }
        .coll-dust-a { animation: coll-billow 4.2s ease-out infinite; }
        .coll-dust-b { animation: coll-billow 4.2s ease-out infinite; animation-delay: -1.4s; }
        .coll-dust-c { animation: coll-billow 4.2s ease-out infinite; animation-delay: -2.4s; }
        .coll-dust-d { animation: coll-billow 4.2s ease-out infinite; animation-delay: -3.3s; }
        .coll-coin-a { transform-box: fill-box; transform-origin: 50% 100%; animation: coll-bury 2.6s ease-in infinite; }
        .coll-coin-b { transform-box: fill-box; transform-origin: 50% 100%; animation: coll-bury 2.6s ease-in infinite; animation-delay: -1.3s; }
        .coll-miner { animation: coll-flee 1.6s ease-in-out infinite; }
        .coll-leg-a { transform-box: fill-box; transform-origin: 50% 0; animation: coll-stride 0.34s linear infinite; }
        .coll-leg-b { transform-box: fill-box; transform-origin: 50% 0; animation: coll-stride 0.34s linear infinite reverse; }
        .coll-lamp { animation: coll-blink 1.1s ease-in-out infinite; }
        .coll-ray { transform-box: fill-box; transform-origin: 100% 50%; animation: coll-sweep 1.6s ease-in-out infinite; }
        .coll-lantern { transform-box: fill-box; transform-origin: 50% 0; animation: coll-swing 1.9s ease-in-out infinite; }
        @keyframes coll-split {
          0% { stroke-dashoffset: 230; }
          45%, 92% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; opacity: 0.4; }
        }
        @keyframes coll-sag-l {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          45% { transform: rotate(3deg) translateY(4px); }
        }
        @keyframes coll-sag-r {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          45% { transform: rotate(-3deg) translateY(4px); }
        }
        @keyframes coll-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes coll-drop {
          0% { transform: translate(0, -18px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          78% { opacity: 1; }
          100% { transform: translate(-16px, 74px) rotate(280deg); opacity: 0; }
        }
        @keyframes coll-billow {
          0% { transform: translate(56px, 26px) scale(0.2); opacity: 0; }
          30% { opacity: 0.45; }
          100% { transform: translate(-52px, -34px) scale(1.7); opacity: 0; }
        }
        @keyframes coll-bury {
          0% { transform: translate(0, 20px) scale(0.6); opacity: 0; }
          25% { transform: translate(0, -10px) scale(1); opacity: 1; }
          100% { transform: translate(-6px, 22px) scale(0.9); opacity: 0; }
        }
        @keyframes coll-flee {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-12px, -4px); }
        }
        @keyframes coll-stride {
          0%, 100% { transform: rotate(26deg); }
          50% { transform: rotate(-26deg); }
        }
        @keyframes coll-blink {
          0%, 100% { opacity: 1; }
          55% { opacity: 0.4; }
        }
        @keyframes coll-sweep {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes coll-swing {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .coll-crack, .coll-beam-l, .coll-beam-r, .coll-post-l, .coll-post-r,
          .coll-rock-a, .coll-rock-b, .coll-rock-c, .coll-dust-a, .coll-dust-b, .coll-dust-c,
          .coll-dust-d, .coll-coin-a, .coll-coin-b, .coll-miner, .coll-leg-a, .coll-leg-b,
          .coll-lamp, .coll-ray, .coll-lantern { animation: none; }
        }
      `}</style>
    </svg>
  );
}
