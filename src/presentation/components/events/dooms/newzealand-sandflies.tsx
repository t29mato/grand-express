/**
 * サンドフライの大群。西海岸・フィヨルドランド名物の吸血バエに囲まれ、
 * トランパーがたまらず両腕を振り回す。夕方の浜辺、置いた荷物、
 * 頭のまわりを回り続ける点々の群れ。
 *
 * 動くのは、旋回する群れ(2重)・振り回す両腕・跳ねる足踏み。
 */
export function NewzealandSandflies() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の西海岸。 */}
      <rect width="400" height="210" fill="#c9a08a" />
      <rect y="0" width="400" height="64" fill="#b8907c" />
      <circle cx="330" cy="40" r="15" fill="#f5d06a" opacity="0.9" />
      <g fill="#a8806c" opacity="0.9">
        <ellipse cx="100" cy="36" rx="70" ry="8" />
        <ellipse cx="260" cy="52" rx="60" ry="7" />
      </g>

      {/* 海と岬のシルエット。 */}
      <rect y="86" width="400" height="34" fill="#7a8a8c" />
      <path d="M0,86 l50,-18 60,18 z" fill="#5f5044" />
      <g stroke="#a8b8b4" strokeWidth="1.6" opacity="0.6" fill="none">
        <path d="M150,96 h50 M260,104 h56 M60,108 h44" />
      </g>

      {/* 原生林の縁。 */}
      <path d="M0,132 q40,-20 80,-10 q40,8 80,2 l0,86 H0 Z" fill="#2d5f45" />
      <g stroke="#1f4a36" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M30,128 V104" />
        <path d="M30,104 q-8,-7 -18,-4 M30,104 q-3,-10 -11,-13 M30,104 q3,-10 10,-13 M30,104 q8,-7 18,-4" />
        <path d="M96,124 V102" />
        <path d="M96,102 q-8,-6 -16,-4 M96,102 q-2,-9 -10,-12 M96,102 q8,-6 16,-4" />
      </g>

      {/* 砂浜。 */}
      <rect y="120" width="400" height="90" fill="#c9b088" />
      <path d="M0,120 q100,8 200,2 t200,4 l0,84 H0 Z" fill="#b8a070" />
      {/* 流木。 */}
      <path d="M250,190 q30,-8 56,-2 l-2,5 q-26,-5 -52,2 z" fill="#8a7458" />
      <path d="M300,188 l12,-9" stroke="#8a7458" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <g stroke="#a8905c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M356,178 l-8,-7 M356,178 l-4,-10 M356,178 l1,-11 M356,178 l7,-8 M356,178 l10,-4" />
        <path d="M28,196 l-8,-7 M28,196 l-4,-10 M28,196 l1,-11 M28,196 l7,-8 M28,196 l10,-4" />
      </g>

      {/* 置いた赤いバックパック。 */}
      <ellipse cx="140" cy="200" rx="13" ry="3.4" fill="#000" opacity="0.2" />
      <g>
        <rect x="128" y="172" width="24" height="28" rx="6" fill="#c2453c" />
        <rect x="132" y="178" width="16" height="9" rx="2" fill="#8a2a24" />
        <path d="M128,180 q-6,4 -4,12" stroke="#8a2a24" strokeWidth="2.6" fill="none" />
        <rect x="134" y="166" width="12" height="8" rx="3" fill="#c2453c" />
      </g>

      {/* たまらず腕を振り回すトランパー。 */}
      <ellipse cx="210" cy="202" rx="13" ry="3.4" fill="#000" opacity="0.2" />
      <g className="nzsf-hop">
        <g strokeLinecap="round">
          <path d="M206,182 L200,201" stroke="#5a4736" strokeWidth="5" fill="none" />
          <path d="M214,182 L219,201" stroke="#6b5844" strokeWidth="5" fill="none" />
          <path d="M210,158 L210,184" stroke="#a8905c" strokeWidth="14" fill="none" />
          <circle cx="210" cy="149" r="7.5" fill="#d9a273" />
          <path d="M202,147 a8,8 0 0 1 16,0 z" fill="#4f6b52" />
        </g>
        {/* 左右の腕。別々のリズムで振り回す。 */}
        <g className="nzsf-armL">
          <path d="M0,0 L-11,-9" stroke="#d9a273" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M-11,-9 L-8,-18" stroke="#d9a273" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
        <g className="nzsf-armR">
          <path d="M0,0 L12,-8" stroke="#d9a273" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M12,-8 L10,-17" stroke="#d9a273" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* サンドフライの群れ。頭のまわりを二重に旋回する。 */}
      <g className="nzsf-swarmA">
        <g fill="#2a2622">
          <circle cx="24" cy="0" r="1.7" />
          <circle cx="17" cy="17" r="1.5" />
          <circle cx="0" cy="24" r="1.7" />
          <circle cx="-17" cy="17" r="1.5" />
          <circle cx="-24" cy="0" r="1.7" />
          <circle cx="-17" cy="-17" r="1.5" />
          <circle cx="0" cy="-24" r="1.7" />
          <circle cx="17" cy="-17" r="1.5" />
        </g>
      </g>
      <g className="nzsf-swarmB">
        <g fill="#3a3630">
          <circle cx="36" cy="0" r="1.4" />
          <circle cx="25" cy="25" r="1.3" />
          <circle cx="0" cy="36" r="1.4" />
          <circle cx="-25" cy="25" r="1.3" />
          <circle cx="-36" cy="0" r="1.4" />
          <circle cx="-25" cy="-25" r="1.3" />
          <circle cx="0" cy="-36" r="1.4" />
          <circle cx="25" cy="-25" r="1.3" />
        </g>
      </g>
      {/* はぐれた数匹(バックパックにも寄ってくる)。 */}
      <g className="nzsf-stray" fill="#2a2622">
        <circle cx="146" cy="162" r="1.5" />
        <circle cx="132" cy="158" r="1.3" />
        <circle cx="152" cy="152" r="1.3" />
      </g>

      <style>{`
        .nzsf-hop {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nzsf-stomp 0.4s ease-in-out infinite alternate;
        }
        .nzsf-armL {
          transform: translate(204px, 160px);
          animation: nzsf-flailL 0.5s ease-in-out infinite alternate;
        }
        .nzsf-armR {
          transform: translate(216px, 160px);
          animation: nzsf-flailR 0.42s ease-in-out infinite alternate;
        }
        .nzsf-swarmA {
          transform: translate(210px, 146px);
          animation: nzsf-orbitA 3.4s linear infinite;
        }
        .nzsf-swarmB {
          transform: translate(210px, 150px);
          animation: nzsf-orbitB 5s linear infinite;
        }
        .nzsf-stray {
          animation: nzsf-jitter 0.9s ease-in-out infinite alternate;
        }
        @keyframes nzsf-stomp {
          from { transform: translateY(0); }
          to { transform: translateY(-2.4px); }
        }
        @keyframes nzsf-flailL {
          from { transform: translate(204px, 160px) rotate(-30deg); }
          to { transform: translate(204px, 160px) rotate(40deg); }
        }
        @keyframes nzsf-flailR {
          from { transform: translate(216px, 160px) rotate(34deg); }
          to { transform: translate(216px, 160px) rotate(-36deg); }
        }
        @keyframes nzsf-orbitA {
          from { transform: translate(210px, 146px) rotate(0deg); }
          to { transform: translate(210px, 146px) rotate(360deg); }
        }
        @keyframes nzsf-orbitB {
          from { transform: translate(210px, 150px) rotate(360deg); }
          to { transform: translate(210px, 150px) rotate(0deg); }
        }
        @keyframes nzsf-jitter {
          from { transform: translate(0, 0); }
          to { transform: translate(3px, -4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzsf-hop, .nzsf-armL, .nzsf-armR, .nzsf-swarmA, .nzsf-swarmB, .nzsf-stray {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
