/**
 * ルアペフの降灰。1995〜96年の実際の噴火を踏まえ、火山灰が線路と機関車に
 * 積もって列車が止まる。溶岩や炎は描かず、遠くの灰色の噴煙と、
 * 降り続ける灰、灰まみれの機関車、灰を掻く保線員で語る。
 *
 * 動くのは、降る灰(2層)・ゆっくり脈打つ噴煙・灰を掻く保線員の腕。
 */
export function NewzealandRuapehuAsh() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰に霞んだ空。 */}
      <rect width="400" height="210" fill="#8a8578" />
      <rect y="0" width="400" height="70" fill="#7a7468" />
      <rect y="60" width="400" height="30" fill="#948e80" />

      {/* 遠景: ルアペフの山体と噴煙の柱。 */}
      <path d="M180,120 L280,34 L286,34 L390,120 Z" fill="#5f5a52" />
      <path d="M283,34 L306,58 L295,53 L286,62 L277,53 L266,58 Z" fill="#c9c0ac" />
      {/* 噴煙(ここだけが脈打つ)。 */}
      <g className="nzra-plume">
        <ellipse cx="283" cy="26" rx="16" ry="10" fill="#4a4640" />
        <ellipse cx="272" cy="16" rx="13" ry="8" fill="#57534a" />
        <ellipse cx="292" cy="12" rx="15" ry="9" fill="#4a4640" />
        <ellipse cx="282" cy="4" rx="18" ry="9" fill="#57534a" />
      </g>

      {/* 灰の積もった平原。 */}
      <rect y="120" width="400" height="90" fill="#a8a296" />
      <g fill="#b8b2a4">
        <ellipse cx="60" cy="140" rx="40" ry="5" />
        <ellipse cx="330" cy="146" rx="46" ry="5" />
      </g>
      {/* 灰をかぶったタソックの茂み。 */}
      <g stroke="#8a8578" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M40,158 l-7,-7 M40,158 l-3,-10 M40,158 l2,-11 M40,158 l6,-8 M40,158 l9,-4" />
        <path d="M356,152 l-7,-7 M356,152 l-3,-10 M356,152 l2,-11 M356,152 l6,-8 M356,152 l9,-4" />
      </g>
      <g fill="#c9c0ac">
        <ellipse cx="40" cy="149" rx="6" ry="2" />
        <ellipse cx="356" cy="143" rx="6" ry="2" />
      </g>

      {/* 線路。 */}
      <rect y="176" width="400" height="5" fill="#57534a" />
      <rect y="186" width="400" height="5" fill="#57534a" />
      <g fill="#6b5330">
        <rect x="8" y="174" width="7" height="20" />
        <rect x="48" y="174" width="7" height="20" />
        <rect x="88" y="174" width="7" height="20" />
        <rect x="128" y="174" width="7" height="20" />
        <rect x="168" y="174" width="7" height="20" />
        <rect x="208" y="174" width="7" height="20" />
        <rect x="248" y="174" width="7" height="20" />
        <rect x="288" y="174" width="7" height="20" />
        <rect x="328" y="174" width="7" height="20" />
        <rect x="368" y="174" width="7" height="20" />
      </g>
      {/* 線路の上に積もった灰。 */}
      <path d="M0,176 q100,-4 200,0 t200,0 v4 H0 Z" fill="#c9c0ac" opacity="0.9" />

      {/* 止まった機関車。上面すべてに灰が積もっている。 */}
      <g>
        <rect x="60" y="118" width="130" height="52" rx="4" fill="#8a4438" />
        <rect x="176" y="128" width="26" height="42" rx="3" fill="#6b342c" />
        <rect x="70" y="128" width="20" height="16" fill="#cfe4f0" />
        <rect x="100" y="128" width="20" height="16" fill="#cfe4f0" />
        <rect x="136" y="128" width="20" height="16" fill="#cfe4f0" />
        {/* 窓の灰の三角。 */}
        <g fill="#c9c0ac">
          <path d="M70,144 h20 l-10,-6 z" />
          <path d="M100,144 h20 l-10,-6 z" />
          <path d="M136,144 h20 l-10,-6 z" />
        </g>
        <g fill="#2a2622">
          <circle cx="82" cy="172" r="8" />
          <circle cx="112" cy="172" r="8" />
          <circle cx="150" cy="172" r="8" />
          <circle cx="180" cy="172" r="8" />
        </g>
        <g fill="#6f6a5e">
          <circle cx="82" cy="172" r="3.4" />
          <circle cx="112" cy="172" r="3.4" />
          <circle cx="150" cy="172" r="3.4" />
          <circle cx="180" cy="172" r="3.4" />
        </g>
        {/* 屋根の灰。もっさり積もる。 */}
        <path d="M56,118 q34,-10 70,-6 q40,4 78,10 l0,8 q-74,-8 -148,-2 z" fill="#c9c0ac" />
        <path d="M176,128 h26 l0,6 q-13,-4 -26,0 z" fill="#c9c0ac" />
      </g>

      {/* 保線員。灰を掻いている(腕とスコップだけ動く)。 */}
      <ellipse cx="258" cy="196" rx="12" ry="3" fill="#000" opacity="0.2" />
      <g strokeLinecap="round">
        <path d="M254,178 L251,196" stroke="#31456b" strokeWidth="5" fill="none" />
        <path d="M260,178 L264,196" stroke="#3a5178" strokeWidth="5" fill="none" />
        <path d="M257,156 L257,180" stroke="#31456b" strokeWidth="13" fill="none" />
        <rect x="250" y="153" width="14" height="12" rx="2" fill="#e8742c" />
        <circle cx="257" cy="146" r="7" fill="#d9a273" />
        <path d="M249.5,144.5 a7.5,7.5 0 0 1 15,0 z" fill="#f5b31c" />
      </g>
      <g className="nzra-shovel">
        <path d="M262,160 l14,10" stroke="#d9a273" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M276,170 l14,14" stroke="#8a6a3c" strokeWidth="2.6" fill="none" />
        <path d="M287,181 q6,-1 8,5 q-5,4 -9,-1 z" fill="#6f6a5e" />
      </g>
      {/* 掻き出した灰の山。 */}
      <ellipse cx="300" cy="196" rx="16" ry="5" fill="#c9c0ac" />
      <ellipse cx="296" cy="193" rx="8" ry="3" fill="#d8d0c0" />

      {/* 降る灰(2層でゆっくり)。 */}
      <g className="nzra-ashA" fill="#d8d0c0" opacity="0.8">
        <circle cx="30" cy="-190" r="1.6" /><circle cx="90" cy="-160" r="1.3" />
        <circle cx="150" cy="-200" r="1.6" /><circle cx="210" cy="-150" r="1.3" />
        <circle cx="270" cy="-185" r="1.6" /><circle cx="330" cy="-165" r="1.3" />
        <circle cx="380" cy="-195" r="1.6" /><circle cx="60" cy="-120" r="1.4" />
        <circle cx="180" cy="-100" r="1.4" /><circle cx="300" cy="-115" r="1.4" />
        <circle cx="30" cy="20" r="1.6" /><circle cx="90" cy="50" r="1.3" />
        <circle cx="150" cy="10" r="1.6" /><circle cx="210" cy="60" r="1.3" />
        <circle cx="270" cy="25" r="1.6" /><circle cx="330" cy="45" r="1.3" />
        <circle cx="380" cy="15" r="1.6" /><circle cx="60" cy="90" r="1.4" />
        <circle cx="180" cy="110" r="1.4" /><circle cx="300" cy="95" r="1.4" />
      </g>
      <g className="nzra-ashB" fill="#b8b2a4" opacity="0.7">
        <circle cx="55" cy="-170" r="1.1" /><circle cx="120" cy="-140" r="1" />
        <circle cx="190" cy="-180" r="1.1" /><circle cx="250" cy="-130" r="1" />
        <circle cx="315" cy="-175" r="1.1" /><circle cx="370" cy="-145" r="1" />
        <circle cx="55" cy="40" r="1.1" /><circle cx="120" cy="70" r="1" />
        <circle cx="190" cy="30" r="1.1" /><circle cx="250" cy="80" r="1" />
        <circle cx="315" cy="35" r="1.1" /><circle cx="370" cy="65" r="1" />
      </g>

      <style>{`
        .nzra-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzra-puff 6s ease-in-out infinite;
        }
        .nzra-shovel {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: nzra-dig 1.4s ease-in-out infinite;
        }
        .nzra-ashA { animation: nzra-fall 9s linear infinite; }
        .nzra-ashB { animation: nzra-fall 13s linear infinite; }
        @keyframes nzra-puff {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08, 1.14); }
        }
        @keyframes nzra-dig {
          0%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(-16deg); }
        }
        @keyframes nzra-fall {
          from { transform: translateY(0); }
          to { transform: translateY(210px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzra-plume, .nzra-shovel, .nzra-ashA, .nzra-ashB {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
