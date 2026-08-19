/**
 * ノーウェスターが吹く。カンタベリー名物の高温乾燥のフェーン風。
 * 空にはノーウェスト・アーチ(山脈の上に弧を描く雲の縁)、
 * 吊り看板が激しく揺れ、木も草も人も同じ向きに煽られている。
 *
 * 動くのは、揺れる看板・しなる木・飛ばされる葉と砂ぼこり・はためく上着の裾。
 */
export function NewzealandNorwester() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱っぽく乾いた空。 */}
      <rect width="400" height="210" fill="#e8c88a" />
      <rect y="0" width="400" height="60" fill="#d8b070" />
      {/* ノーウェスト・アーチ: 山脈の上にかかる雲の帯と、その下の晴れ間の弧。 */}
      <path d="M0,58 q200,-40 400,0 v-58 H0 Z" fill="#c9c0ac" />
      <path d="M0,58 q200,-40 400,0 l0,10 q-200,-38 -400,0 z" fill="#e8e0d0" />
      {/* 南アルプスの稜線。 */}
      <path d="M0,96 L40,74 L80,90 L130,70 L180,88 L230,74 L280,90 L330,78 L400,94 V110 H0 Z" fill="#a89078" />
      <path d="M128,72 l7,8 -3.5,-1.5 -3.5,3.5 -3.5,-3.5 -3.5,1.5 z" fill="#f0ead8" />

      {/* 乾いた牧草地。 */}
      <rect y="96" width="400" height="114" fill="#c9a860" />
      <rect y="150" width="400" height="60" fill="#b8955a" />
      <g stroke="#a8874c" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,126 q100,-6 200,0 t200,0" />
        <path d="M0,170 q100,-5 200,0 t200,0" />
      </g>

      {/* 風向きの砂ぼこり(左→右へ流れ続ける)。 */}
      <g className="nzn-dust" stroke="#e0c894" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" fill="none">
        <path d="M-380,108 q14,-3 26,0 M-320,140 q16,-4 30,0 M-250,120 q12,-3 24,0 M-160,160 q16,-4 30,0 M-80,112 q12,-3 22,0" />
        <path d="M20,108 q14,-3 26,0 M80,140 q16,-4 30,0 M150,120 q12,-3 24,0 M240,160 q16,-4 30,0 M320,112 q12,-3 22,0" />
      </g>
      {/* 飛ばされる葉。 */}
      <g className="nzn-leaves" fill="#8a9a52">
        <ellipse cx="-360" cy="90" rx="4" ry="2" />
        <ellipse cx="-270" cy="130" rx="3.4" ry="1.8" />
        <ellipse cx="-170" cy="100" rx="4" ry="2" />
        <ellipse cx="-60" cy="146" rx="3.4" ry="1.8" />
        <ellipse cx="40" cy="90" rx="4" ry="2" />
        <ellipse cx="130" cy="130" rx="3.4" ry="1.8" />
        <ellipse cx="230" cy="100" rx="4" ry="2" />
        <ellipse cx="340" cy="146" rx="3.4" ry="1.8" />
      </g>

      {/* 風にしなるポプラ(根元を軸に揺れる)。 */}
      <g className="nzn-tree1">
        <rect x="52" y="128" width="4" height="18" fill="#6b5330" />
        <path d="M54,86 q10,22 0,44 q-14,-22 0,-44 z" fill="#7f9a4f" transform="rotate(10 54 130)" />
      </g>
      <g className="nzn-tree2">
        <rect x="330" y="120" width="5" height="22" fill="#6b5330" />
        <path d="M332.5,68 q13,28 0,56 q-17,-28 0,-56 z" fill="#7f9a4f" transform="rotate(10 332.5 142)" />
      </g>
      {/* なびく草。 */}
      <g stroke="#a8874c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M30,186 q8,-8 18,-9 M36,190 q8,-6 16,-7" />
        <path d="M250,196 q8,-8 18,-9 M256,200 q8,-6 16,-7" />
        <path d="M380,182 q8,-8 16,-8" />
      </g>

      {/* 田舎のパブ。吊り看板が激しく揺れる。 */}
      <rect x="120" y="98" width="88" height="60" fill="#8a5568" />
      <path d="M114,98 h100 l-10,-16 h-80 z" fill="#57534a" />
      <rect x="130" y="112" width="18" height="16" fill="#f2e0b4" />
      <rect x="178" y="112" width="18" height="16" fill="#f2e0b4" />
      <rect x="152" y="128" width="22" height="30" fill="#4a3320" />
      {/* 看板の腕木。 */}
      <path d="M208,104 h26" stroke="#4a3320" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <g className="nzn-sign">
        <path d="M0,0 v8" stroke="#4a3320" strokeWidth="2" fill="none" />
        <rect x="-11" y="8" width="22" height="16" rx="2" fill="#f2e0b4" />
        <circle cx="0" cy="16" r="4.4" fill="#c9773c" />
        <path d="M-11,8 h22" stroke="#8a5a2c" strokeWidth="2" fill="none" />
      </g>

      {/* 風に向かって進もうとする人。帽子を押さえている。 */}
      <ellipse cx="286" cy="200" rx="13" ry="3.4" fill="#000" opacity="0.2" />
      <g strokeLinecap="round">
        <path d="M282,180 L272,198" stroke="#4a3a2c" strokeWidth="5" fill="none" />
        <path d="M288,180 L292,199" stroke="#5a4736" strokeWidth="5" fill="none" />
        <g transform="rotate(12 286 170)">
          <path d="M286,156 L286,182" stroke="#f2ede0" strokeWidth="13" fill="none" />
          <circle cx="287" cy="148" r="7" fill="#e0b48a" />
          {/* 帽子を押さえる腕。 */}
          <path d="M282,160 L280,148 L285,144" stroke="#e0b48a" strokeWidth="3.4" fill="none" />
          <path d="M279,144.5 a8,8 0 0 1 16,0 z" fill="#8a5a2c" />
          <rect x="277" y="143" width="20" height="2.6" rx="1.3" fill="#6b4423" />
          {/* 後ろへ流される腕。 */}
          <path d="M291,162 L302,168" stroke="#e0b48a" strokeWidth="3.4" fill="none" />
        </g>
      </g>
      {/* 風に流されはためくスカーフ。 */}
      <g className="nzn-coat">
        <path d="M0,0 q8,-3 15,1 q-2,3 1,6 q-9,2 -16,-3 z" fill="#c9773c" />
      </g>

      <style>{`
        .nzn-dust { animation: nzn-blow 3.2s linear infinite; }
        .nzn-leaves { animation: nzn-blow 2.4s linear infinite; }
        .nzn-tree1 {
          transform-box: fill-box;
          transform-origin: 30% 100%;
          animation: nzn-sway 1.8s ease-in-out infinite alternate;
        }
        .nzn-tree2 {
          transform-box: fill-box;
          transform-origin: 30% 100%;
          animation: nzn-sway 1.5s ease-in-out infinite alternate;
        }
        .nzn-sign {
          transform: translate(234px, 104px) rotate(14deg);
          transform-origin: 0 0;
          animation: nzn-swing 0.9s ease-in-out infinite alternate;
        }
        .nzn-coat {
          transform: translate(292px, 154px);
          transform-origin: 0 0;
          animation: nzn-flap 0.5s ease-in-out infinite alternate;
        }
        @keyframes nzn-blow {
          from { transform: translateX(0); }
          to { transform: translateX(400px); }
        }
        @keyframes nzn-sway {
          from { transform: rotate(4deg); }
          to { transform: rotate(14deg); }
        }
        @keyframes nzn-swing {
          from { transform: translate(234px, 104px) rotate(4deg); }
          to { transform: translate(234px, 104px) rotate(26deg); }
        }
        @keyframes nzn-flap {
          from { transform: translate(292px, 154px) scaleX(0.85) skewY(6deg); }
          to { transform: translate(292px, 154px) scaleX(1.1) skewY(-4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzn-dust, .nzn-leaves, .nzn-tree1, .nzn-tree2, .nzn-sign, .nzn-coat {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
