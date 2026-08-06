/**
 * 9月 — キヌアの種まき(ボリビア南部アルティプラーノ)。
 *
 * 塩湖のふちの薄い土に、家族が掘り棒で穴をあけ、種をまいていく。
 * 空にはたった一つの雲。降るかどうかは分からないまま蒔く。
 */
export function Bolivia05() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高く乾いた空 */}
      <rect width="400" height="210" fill="#7fb8e0" />
      <rect y="60" width="400" height="30" fill="#a3cfe9" />
      <rect y="90" width="400" height="22" fill="#cbe4f2" />

      {/* たった一つの雲 */}
      <g className="b05-cloud" fill="#f4fafd">
        <ellipse cx="120" cy="30" rx="26" ry="9" />
        <ellipse cx="138" cy="24" rx="17" ry="9" />
        <ellipse cx="104" cy="26" rx="14" ry="7" />
      </g>

      {/* トゥヌパ山 */}
      <path d="M0,112 L46,74 L96,112 Z" fill="#8c8296" />
      <path d="M232,112 L296,48 L362,112 Z" fill="#7d7388" />
      <path d="M296,48 L316,68 L276,68 Z" fill="#f0f4f8" />
      <path d="M296,48 L362,112 L318,112 Z" fill="#6d6478" />
      <path d="M340,112 L384,84 L400,112 Z" fill="#8c8296" />

      {/* 塩湖 */}
      <rect y="112" width="400" height="24" fill="#eef3f8" />
      <rect y="112" width="400" height="4" fill="#cfdde8" />
      <g stroke="#d5e0ea" strokeWidth="1.4" fill="none">
        <path d="M14,120 L40,118 L62,124 M40,118 L44,130 M62,124 L86,120 L110,126 M86,120 L90,132" />
        <path d="M140,122 L166,118 L190,124 M166,118 L170,131 M190,124 L214,119 L238,125" />
        <path d="M262,121 L288,117 L312,123 M288,117 L292,130 M312,123 L338,119 L366,125 M338,119 L342,132" />
      </g>

      {/* 薄い土の畑 */}
      <rect y="134" width="400" height="76" fill="#a8703f" />
      <g fill="#8f5a2e">
        <rect y="142" width="400" height="4" />
        <rect y="154" width="400" height="5" />
        <rect y="170" width="400" height="6" />
        <rect y="190" width="400" height="8" />
      </g>
      <g fill="#bd8551">
        <rect y="147" width="400" height="4" />
        <rect y="161" width="400" height="5" />
        <rect y="180" width="400" height="6" />
      </g>
      <g fill="#7d4c26">
        <ellipse cx="146" cy="199" rx="9" ry="3.5" />
        <ellipse cx="186" cy="186" rx="8" ry="3" />
        <ellipse cx="252" cy="196" rx="9" ry="3.5" />
        <ellipse cx="292" cy="182" rx="7" ry="3" />
      </g>

      {/* 掘り棒で穴をあける人 */}
      <g transform="translate(110,196)">
        <ellipse cx="2" cy="2" rx="22" ry="5" fill="#8f5a2e" />
        <rect x="-11" y="-24" width="9" height="25" rx="4" fill="#3b4a6b" />
        <rect x="2" y="-24" width="9" height="25" rx="4" fill="#3b4a6b" />
        <rect x="-14" y="-56" width="28" height="34" rx="6" fill="#4f9e4a" />
        <path d="M-15,-54 L-28,-38 L-21,-30 L-12,-44 Z" fill="#e8443f" />
        <path d="M-28,-44 L-15,-50 L-13,-42 L-26,-36 Z" fill="#f5b31c" />
        <rect x="-4" y="-54" width="24" height="8" rx="4" fill="#4f9e4a" />
        <circle cx="0" cy="-66" r="11" fill="#c98a5e" />
        <path d="M-11,-68 a11,11 0 0 1 22,0 L9,-63 L-9,-63 Z" fill="#2b2436" />
        <rect x="-15" y="-76" width="31" height="4" rx="2" fill="#8a3f5e" />
        <rect x="-9" y="-84" width="19" height="9" rx="2" fill="#8a3f5e" />
        <g className="b05-hoe">
          <rect x="8" y="-52" width="7" height="54" rx="3" fill="#8a5f3f" />
          <path d="M5,-2 L18,-2 L20,10 L3,10 Z" fill="#5f6673" />
          <rect x="6" y="-4" width="11" height="4" fill="#3f4552" />
        </g>
        <circle cx="14" cy="-50" r="6" fill="#c98a5e" />
      </g>
      <g fill="#c69063">
        <ellipse className="b05-dust b05-dust-a" cx="0" cy="0" rx="9" ry="6" />
        <ellipse className="b05-dust b05-dust-b" cx="0" cy="0" rx="7" ry="5" />
      </g>

      {/* 種をまく人 */}
      <g transform="translate(224,202)">
        <ellipse cx="-2" cy="2" rx="24" ry="5" fill="#8f5a2e" />
        <path d="M-22,2 L-16,-30 L16,-30 L22,2 Z" fill="#b0384f" />
        <path d="M-19,-12 L19,-12 L20,-6 L-20,-6 Z" fill="#8e2a3e" />
        <rect x="-14" y="-58" width="28" height="30" rx="6" fill="#3b6fa8" />
        <path d="M-16,-40 C-4,-46 10,-46 20,-40 L18,-24 C6,-30 -6,-30 -16,-26 Z" fill="#e8c98a" />
        <path d="M-16,-40 C-4,-46 10,-46 20,-40 L20,-36 C8,-42 -4,-42 -16,-36 Z" fill="#c9a877" />
        <circle cx="0" cy="-68" r="11" fill="#c98a5e" />
        <path d="M-8,-61 L-11,-38 L-5,-38 L-2,-60 Z" fill="#2b2436" />
        <path d="M8,-61 L11,-38 L5,-38 L2,-60 Z" fill="#2b2436" />
        <path d="M-11,-70 a11,11 0 0 1 22,0 L9,-65 L-9,-65 Z" fill="#2b2436" />
        <rect x="-15" y="-78" width="31" height="4" rx="2" fill="#3a3244" />
        <rect x="-9" y="-86" width="19" height="9" rx="2" fill="#3a3244" />
        <g className="b05-cast">
          <rect x="12" y="-58" width="28" height="8" rx="4" fill="#3b6fa8" />
          <circle cx="42" cy="-54" r="6" fill="#c98a5e" />
        </g>
      </g>

      {/* こぼれ落ちる種 */}
      <g fill="#e8dcb8">
        <circle className="b05-seed b05-seed-a" cx="0" cy="0" r="3" />
        <circle className="b05-seed b05-seed-b" cx="0" cy="0" r="2.4" />
        <circle className="b05-seed b05-seed-c" cx="0" cy="0" r="3.2" />
        <circle className="b05-seed b05-seed-d" cx="0" cy="0" r="2.6" />
      </g>

      {/* 実ったキヌア */}
      <g>
        <g className="b05-quinoa b05-quinoa-a">
          <rect x="322" y="150" width="5" height="50" fill="#4f8a3c" />
          <path d="M324,168 C312,164 306,156 304,150 C314,152 322,160 324,168 Z" fill="#5f9e46" />
          <path d="M325,182 C337,178 343,170 345,164 C335,166 327,174 325,182 Z" fill="#4f8a3c" />
          <g fill="#b0384f">
            <circle cx="324" cy="120" r="4" />
            <circle cx="319" cy="128" r="4.5" />
            <circle cx="329" cy="128" r="4.5" />
            <circle cx="315" cy="137" r="4.5" />
            <circle cx="324" cy="137" r="5" />
            <circle cx="333" cy="137" r="4.5" />
            <circle cx="318" cy="146" r="4.5" />
            <circle cx="328" cy="146" r="4.5" />
            <circle cx="323" cy="154" r="4" />
          </g>
        </g>
        <g className="b05-quinoa b05-quinoa-b">
          <rect x="356" y="156" width="5" height="46" fill="#4f8a3c" />
          <path d="M358,172 C346,168 340,160 338,154 C348,156 356,164 358,172 Z" fill="#4f8a3c" />
          <path d="M359,186 C371,182 377,174 379,168 C369,170 361,178 359,186 Z" fill="#5f9e46" />
          <g fill="#d1642f">
            <circle cx="358" cy="128" r="3.6" />
            <circle cx="353" cy="136" r="4.2" />
            <circle cx="363" cy="136" r="4.2" />
            <circle cx="350" cy="144" r="4.2" />
            <circle cx="358" cy="144" r="4.6" />
            <circle cx="366" cy="144" r="4.2" />
            <circle cx="353" cy="152" r="4.2" />
            <circle cx="362" cy="152" r="4.2" />
          </g>
        </g>
        <g className="b05-quinoa b05-quinoa-c">
          <rect x="386" y="160" width="5" height="44" fill="#4f8a3c" />
          <path d="M388,176 C376,172 370,164 368,158 C378,160 386,168 388,176 Z" fill="#5f9e46" />
          <g fill="#8f2f4a">
            <circle cx="388" cy="134" r="3.4" />
            <circle cx="383" cy="142" r="4" />
            <circle cx="393" cy="142" r="4" />
            <circle cx="381" cy="150" r="4" />
            <circle cx="390" cy="150" r="4.4" />
            <circle cx="386" cy="158" r="4" />
          </g>
        </g>
      </g>

      <style>{`
        .b05-cloud { animation: b05-drift 34s linear infinite; }
        .b05-hoe { transform-box: fill-box; transform-origin: 50% 0; transform: rotate(-26deg); animation: b05-dig 2.2s ease-in infinite; }
        .b05-dust-a { transform: translate(150px, 192px); animation: b05-puff 2.2s ease-out infinite; }
        .b05-dust-b { transform: translate(160px, 190px); animation: b05-puff-b 2.2s ease-out -0.12s infinite; }
        .b05-cast { transform-box: fill-box; transform-origin: 4% 50%; transform: rotate(-6deg); animation: b05-sow 2.8s ease-in-out infinite; }
        .b05-seed-a { transform: translate(282px, 160px); animation: b05-scatter-a 2.8s ease-in infinite; }
        .b05-seed-b { transform: translate(296px, 168px); animation: b05-scatter-b 2.8s ease-in -0.14s infinite; }
        .b05-seed-c { transform: translate(272px, 172px); animation: b05-scatter-c 2.8s ease-in -0.28s infinite; }
        .b05-seed-d { transform: translate(304px, 178px); animation: b05-scatter-d 2.8s ease-in -0.42s infinite; }
        .b05-quinoa { transform-box: fill-box; transform-origin: 50% 100%; }
        .b05-quinoa-a { animation: b05-sway 4.6s ease-in-out infinite; }
        .b05-quinoa-b { animation: b05-sway 4.6s ease-in-out -1.5s infinite; }
        .b05-quinoa-c { animation: b05-sway 4.6s ease-in-out -3s infinite; }
        @keyframes b05-drift {
          from { transform: translateX(-160px); }
          to { transform: translateX(300px); }
        }
        @keyframes b05-dig {
          0% { transform: rotate(-48deg); }
          38% { transform: rotate(-10deg); }
          52% { transform: rotate(-14deg); }
          100% { transform: rotate(-48deg); }
        }
        @keyframes b05-puff {
          0%, 34% { transform: translate(140px, 196px) scale(0.2); opacity: 0; }
          44% { transform: translate(142px, 192px) scale(1); opacity: 0.8; }
          100% { transform: translate(128px, 180px) scale(1.7); opacity: 0; }
        }
        @keyframes b05-puff-b {
          0%, 34% { transform: translate(146px, 198px) scale(0.2); opacity: 0; }
          44% { transform: translate(150px, 194px) scale(1); opacity: 0.7; }
          100% { transform: translate(162px, 184px) scale(1.7); opacity: 0; }
        }
        @keyframes b05-sow {
          0%, 100% { transform: rotate(-6deg); }
          30% { transform: rotate(-30deg); }
          55% { transform: rotate(14deg); }
        }
        @keyframes b05-scatter-a {
          0%, 46% { transform: translate(266px, 148px) scale(0.5); opacity: 0; }
          56% { transform: translate(278px, 152px) scale(1); opacity: 1; }
          92% { transform: translate(300px, 190px) scale(1); opacity: 1; }
          100% { transform: translate(302px, 194px) scale(1); opacity: 0; }
        }
        @keyframes b05-scatter-b {
          0%, 46% { transform: translate(266px, 148px) scale(0.5); opacity: 0; }
          56% { transform: translate(284px, 158px) scale(1); opacity: 1; }
          92% { transform: translate(318px, 186px) scale(1); opacity: 1; }
          100% { transform: translate(322px, 190px) scale(1); opacity: 0; }
        }
        @keyframes b05-scatter-c {
          0%, 46% { transform: translate(266px, 148px) scale(0.5); opacity: 0; }
          56% { transform: translate(276px, 162px) scale(1); opacity: 1; }
          92% { transform: translate(288px, 198px) scale(1); opacity: 1; }
          100% { transform: translate(290px, 202px) scale(1); opacity: 0; }
        }
        @keyframes b05-scatter-d {
          0%, 46% { transform: translate(266px, 148px) scale(0.5); opacity: 0; }
          56% { transform: translate(290px, 166px) scale(1); opacity: 1; }
          92% { transform: translate(330px, 196px) scale(1); opacity: 1; }
          100% { transform: translate(334px, 200px) scale(1); opacity: 0; }
        }
        @keyframes b05-sway {
          0%, 100% { transform: rotate(-3.5deg); }
          50% { transform: rotate(3.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .b05-cloud, .b05-hoe, .b05-dust-a, .b05-dust-b, .b05-cast,
          .b05-seed-a, .b05-seed-b, .b05-seed-c, .b05-seed-d,
          .b05-quinoa-a, .b05-quinoa-b, .b05-quinoa-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
