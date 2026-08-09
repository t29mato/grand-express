/**
 * 雨が来ない。モンスーンが高原の手前で止まる。
 *
 * 唯一の雲は雨を落とさずに通り過ぎ、井戸の釣瓶は空のまま上がってくる。
 * ひび割れた畑で作物がうなだれ、ここの品物の値が一斉に下がる。
 *
 * ## 赤い下向きの矢を外した
 *
 * 同じ矢が3つの盤面に出ていた(ここ・`france-vendange-ratee`・`world-devaluation`)。
 * 形も色も同じで、3枚とも**それが動く要素**だった。場面の中のものではなく**記号**である。
 *
 * ここでは**硬貨がひとりでに縮んでいく**のが既に「値が下がる」を言っていたので、
 * 矢は言い直しでしかなかった。外して、代わりに**半分しか入っていない麻袋**を
 * 硬貨の下に置いた。**その袋がいまいくらになるか**という並びになる。
 * 硬貨は記号ではなく場面の中の物なので残してある。
 *
 * 位置決めは外側の <g transform> に、動きは内側のクラスに分ける。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaDrought() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灼けた空 */}
      <rect width="400" height="210" fill="#a8683a" />
      <rect y="64" width="400" height="64" fill="#c98a4a" />

      {/* 照りつける太陽 */}
      <g className="idr-sun">
        <circle cx="314" cy="44" r="42" fill="#e05252" opacity="0.2" />
        <circle cx="314" cy="44" r="31" fill="#f5b31c" opacity="0.45" />
        <circle cx="314" cy="44" r="21" fill="#f5d24a" />
      </g>

      {/* 雨を落とさずに去っていく雲 */}
      <g transform="translate(196,36)">
        <g className="idr-cloud">
          <ellipse cx="-16" cy="-2" rx="20" ry="14" fill="#c9b49c" />
          <ellipse cx="10" cy="-8" rx="24" ry="17" fill="#c9b49c" />
          <ellipse cx="30" cy="2" rx="17" ry="11" fill="#b8a289" />
          <rect x="-36" y="0" width="68" height="12" rx="6" fill="#b8a289" />
        </g>
      </g>

      {/* 干上がった台地 */}
      <path
        d="M0,116 L48,96 L96,114 L150,98 L206,116 L262,100 L320,116 L400,102 L400,132 L0,132z"
        fill="#8a5f34"
      />
      <rect y="126" width="400" height="84" fill="#b08a55" />
      <rect y="172" width="400" height="38" fill="#a07c46" />

      {/* ひび割れ */}
      <g stroke="#6b4d26" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M14,150 l22,8 l-10,10 l26,6" />
        <path d="M118,146 l18,12 l-14,8" />
        <path d="M188,200 l30,-10 l24,10" />
        <path d="M300,160 l20,10 l-8,10 l24,6" />
        <path d="M52,192 l26,8" />
        <g transform="translate(136,180)">
          <path className="idr-crack" d="M0,0 l34,-8 l22,12 l30,-6" />
        </g>
      </g>

      {/* 水の落ちた井戸 */}
      <g>
        <rect x="42" y="94" width="7" height="50" fill="#6b573c" />
        <rect x="92" y="94" width="7" height="50" fill="#6b573c" />
        <rect x="38" y="88" width="65" height="7" rx="3" fill="#6b573c" />
        <g transform="translate(68,94)">
          <rect className="idr-rope" x="0" y="0" width="3" height="30" fill="#4e3f2a" />
        </g>
        <g transform="translate(69,124)">
          <g className="idr-bucket">
            <path d="M-9,0 L9,0 L6,14 L-6,14z" fill="#7a4a2a" />
            <rect x="-9" y="-2" width="18" height="4" rx="2" fill="#5c3520" />
          </g>
        </g>
        <rect x="44" y="146" width="53" height="46" fill="#7d6a4e" />
        <g fill="#6b593f">
          <rect x="44" y="158" width="53" height="3" />
          <rect x="44" y="172" width="53" height="3" />
          <rect x="60" y="146" width="3" height="46" />
        </g>
        <ellipse cx="70" cy="146" rx="27" ry="9" fill="#8f7b5c" />
        <ellipse cx="70" cy="146" rx="18" ry="6" fill="#3a2f22" />
        {/* 底から立つ土埃 */}
        <g fill="#c9a877">
          <circle className="idr-dust-a" cx="62" cy="142" r="7" />
          <circle className="idr-dust-b" cx="76" cy="142" r="6" />
          <circle className="idr-dust-c" cx="69" cy="142" r="5" />
        </g>
      </g>

      {/* 穂がうなだれた畑 */}
      <g stroke="#8a7a3a" strokeWidth="3" strokeLinecap="round" fill="none">
        <g transform="translate(160,190)">
          <g className="idr-crop-a">
            <path d="M0,0 q3,-20 -2,-36" />
            <path d="M0,-13 q13,-4 17,-14" strokeWidth="2.5" />
            <path d="M-1,-23 q-13,-2 -16,-12" strokeWidth="2.5" />
            <path d="M-2,-36 q-3,-13 11,-15 q6,11 -5,16z" fill="#9a8a45" strokeWidth="2" />
          </g>
        </g>
        <g transform="translate(196,196)">
          <g className="idr-crop-b">
            <path d="M0,0 q3,-22 -2,-40" />
            <path d="M0,-15 q13,-4 17,-14" strokeWidth="2.5" />
            <path d="M-1,-26 q-13,-2 -16,-12" strokeWidth="2.5" />
            <path d="M-2,-40 q-3,-13 11,-15 q6,11 -5,16z" fill="#9a8a45" strokeWidth="2" />
          </g>
        </g>
        <g transform="translate(234,190)">
          <g className="idr-crop-c">
            <path d="M0,0 q3,-19 -2,-34" />
            <path d="M0,-12 q12,-4 16,-13" strokeWidth="2.5" />
            <path d="M-1,-22 q-12,-2 -15,-11" strokeWidth="2.5" />
            <path d="M-2,-34 q-3,-12 10,-14 q6,10 -5,15z" fill="#9a8a45" strokeWidth="2" />
          </g>
        </g>
        <g transform="translate(272,198)">
          <g className="idr-crop-d">
            <path d="M0,0 q3,-22 -2,-40" />
            <path d="M0,-15 q13,-4 17,-14" strokeWidth="2.5" />
            <path d="M-1,-26 q-13,-2 -16,-12" strokeWidth="2.5" />
            <path d="M-2,-40 q-3,-13 11,-15 q6,11 -5,16z" fill="#9a8a45" strokeWidth="2" />
          </g>
        </g>
        <g transform="translate(310,190)">
          <g className="idr-crop-e">
            <path d="M0,0 q3,-19 -2,-35" />
            <path d="M0,-13 q12,-4 16,-13" strokeWidth="2.5" />
            <path d="M-1,-23 q-12,-2 -15,-11" strokeWidth="2.5" />
            <path d="M-2,-35 q-3,-12 10,-14 q6,10 -5,15z" fill="#9a8a45" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* 品物の値が一斉に下がる */}
      <g transform="translate(362,134)">
        <g className="idr-coin">
          <circle r="15" fill="#f5b31c" />
          <circle r="8" fill="#c98a12" />
        </g>
      </g>
      {/* 半分しか入っていない麻袋。硬貨の下に置いて、値がつく先を見せる。静物。
          **地面と同じ色にしない。**最初 `#b08a55` で描いたら大地に沈んで見えなかった。 */}
      <g transform="translate(350,192)">
        <path d="M-26,16 q-4,-24 6,-32 q-6,-6 2,-8 l14,0 q8,2 2,8 q10,8 6,32z" fill="#cbb083" />
        <path d="M-24,8 q24,-6 48,0 l0,9 q-24,-6 -48,0z" fill="#9c7c4a" />
        <path d="M-18,-24 q18,-5 36,0" stroke="#9c7c4a" strokeWidth="2.5" fill="none" />
        <path d="M-14,-30 l6,-6 M0,-32 l0,-6 M14,-30 l-6,-6" stroke="#9c7c4a" strokeWidth="2.5" fill="none" />
      </g>

      {/* 陽炎 */}
      <g fill="none" stroke="#e8c07a" strokeWidth="2.5" strokeLinecap="round">
        <g transform="translate(112,142)">
          <path className="idr-heat-a" d="M0,0 q7,-7 14,0 q7,7 14,0" />
        </g>
        <g transform="translate(214,150)">
          <path className="idr-heat-b" d="M0,0 q7,-7 14,0 q7,7 14,0" />
        </g>
        <g transform="translate(24,166)">
          <path className="idr-heat-c" d="M0,0 q7,-7 14,0 q7,7 14,0" />
        </g>
      </g>

      <style>{`
        .idr-sun {
          transform-box: fill-box;
          transform-origin: center;
          animation: idr-blaze 3.4s ease-in-out infinite;
        }
        .idr-cloud {
          transform-box: fill-box;
          transform-origin: center;
          animation: idr-pass 9s linear infinite;
        }
        .idr-crack {
          transform-box: fill-box;
          transform-origin: left center;
          animation: idr-split 4.6s ease-out infinite;
        }
        .idr-rope {
          transform-box: fill-box;
          transform-origin: top center;
          animation: idr-lower 5.2s ease-in-out infinite;
        }
        .idr-bucket {
          transform-box: fill-box;
          transform-origin: top center;
          animation: idr-dip 5.2s ease-in-out infinite;
        }
        .idr-dust-a {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: idr-puff 5.2s ease-out infinite;
        }
        .idr-dust-b {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: idr-puff 5.2s ease-out infinite;
          animation-delay: 0.2s;
        }
        .idr-dust-c {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: idr-puff 5.2s ease-out infinite;
          animation-delay: 0.4s;
        }
        .idr-crop-a {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(12deg);
          animation: idr-wilt 4s ease-in-out infinite;
        }
        .idr-crop-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(12deg);
          animation: idr-wilt 4.6s ease-in-out infinite;
          animation-delay: -0.6s;
        }
        .idr-crop-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(12deg);
          animation: idr-wilt 4.2s ease-in-out infinite;
          animation-delay: -1.2s;
        }
        .idr-crop-d {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(12deg);
          animation: idr-wilt 4.8s ease-in-out infinite;
          animation-delay: -1.8s;
        }
        .idr-crop-e {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(12deg);
          animation: idr-wilt 4.4s ease-in-out infinite;
          animation-delay: -2.4s;
        }
        .idr-coin {
          transform-box: fill-box;
          transform-origin: center;
          animation: idr-shrink 2.2s ease-in-out infinite;
        }
        .idr-heat-a { transform-box: fill-box; transform-origin: center; opacity: 0.4; animation: idr-shimmer 2.6s linear infinite; }
        .idr-heat-b { transform-box: fill-box; transform-origin: center; opacity: 0.4; animation: idr-shimmer 3.1s linear infinite; animation-delay: -0.8s; }
        .idr-heat-c { transform-box: fill-box; transform-origin: center; opacity: 0.4; animation: idr-shimmer 2.9s linear infinite; animation-delay: -1.6s; }
        @keyframes idr-blaze {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes idr-pass {
          0% { transform: translate(30px, 0) scale(1); opacity: 0.95; }
          70% { transform: translate(-98px, -8px) scale(0.8); opacity: 0.7; }
          100% { transform: translate(-166px, -14px) scale(0.55); opacity: 0; }
        }
        @keyframes idr-split {
          0%, 18% { transform: scaleX(0.05); opacity: 0; }
          34% { opacity: 1; }
          70%, 100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes idr-lower {
          0%, 22% { transform: scaleY(1); }
          46%, 58% { transform: scaleY(1.95); }
          82%, 100% { transform: scaleY(1); }
        }
        @keyframes idr-dip {
          0%, 22% { transform: translate(0, 0); }
          46%, 58% { transform: translate(0, 28px); }
          82%, 100% { transform: translate(0, 0); }
        }
        @keyframes idr-puff {
          0%, 44% { transform: translate(0, 0) scale(0.2); opacity: 0; }
          58% { opacity: 0.7; }
          86%, 100% { transform: translate(0, -34px) scale(1.5); opacity: 0; }
        }
        @keyframes idr-wilt {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(21deg); }
        }
          50% { transform: translate(0, 6px); opacity: 1; }
        }
        @keyframes idr-shrink {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.62); }
        }
        @keyframes idr-shimmer {
          0% { transform: translate(0, 6px) scaleX(1); opacity: 0; }
          30% { opacity: 0.45; }
          100% { transform: translate(-6px, -22px) scaleX(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idr-sun, .idr-cloud, .idr-crack, .idr-rope, .idr-bucket,
          .idr-dust-a, .idr-dust-b, .idr-dust-c,
          .idr-crop-a, .idr-crop-b, .idr-crop-c, .idr-crop-d, .idr-crop-e,
          .idr-coin, .idr-heat-a, .idr-heat-b, .idr-heat-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
