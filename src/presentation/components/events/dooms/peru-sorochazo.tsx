/**
 * ソローチャソ。標高4000メートルを超えたあたりで、まず頭痛が来て、それから吐き気が来る。
 * この高さの空気に含まれる酸素は海抜近くの半分ほどしかない。
 * 歩みを緩め、コカ茶を飲むこと以外に、ここで真剣に語られる対処法はない。
 *
 * 構図: 峠の路肩。**薄い空気を出すため、空の上端をほとんど紺にする。**
 * 左に腰を下ろして頭を垂れた旅人、その前に膝をついてコカ茶の椀を差し出す連れ。
 * 右奥に停まったバスと、標高の標柱。中景に雪の稜線。
 *
 * **苦しませる絵にしない。**痛みではなく「座って、ゆっくりする」ところを描く。
 *
 * 動くのは4つ: 湯気、旅人の肩がゆっくり上下する息、頭の上で浮き沈みする重さの弧、
 * 薄い雲の流れ。
 * 止めても「峠で座り込んだ人と、差し出された椀」で伝わる。
 *
 * (ボリビア盤のソローチェとは別物にする: あちらは頭のまわりを星が回り、
 *  逆方向の汽車に押し込まれる。こちらは**誰も動かさない。座って休んでいる。**)
 */
export function PeruSorochazo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄い空気の空。上へ行くほど紺に近づく。 */}
      <rect width="400" height="210" fill="#2f5f9a" />
      <rect width="400" height="150" fill="#3f7cba" />
      <rect width="400" height="96" fill="#2a5490" />
      <circle cx="330" cy="34" r="18" fill="#f2e8c8" opacity="0.9" />

      {/* 中景: 雪の稜線。 */}
      <path
        d="M0,132L46,84L84,118L130,72L182,116L228,80L276,120L322,86L368,118L400,96v36z"
        fill="#8f97a4"
      />
      <path
        d="M46,84L30,104q10,4 16,-2q6,-4 14,2zM130,72L112,98q12,6 20,-2q8,-6 18,2zM228,80L210,104q12,6 20,-2q8,-5 18,2zM322,86L306,108q11,5 18,-2q7,-5 16,2z"
        fill="#f2f6f8"
      />

      {/* 高原の地面。 */}
      <rect y="132" width="400" height="78" fill="#b5a267" />
      <path d="M0,132q92,-8 184,1q92,9 216,-3v12H0z" fill="#c2b077" />

      {/* 峠の道と路肩。 */}
      <rect y="164" width="400" height="26" fill="#9a8d70" />
      <rect y="164" width="400" height="4" fill="#a89a7c" />
      <g
        stroke="#c9bfa2"
        strokeWidth="3"
        strokeDasharray="18 16"
        opacity="0.5"
        fill="none"
      >
        <path d="M0,178h400" />
      </g>

      {/* 標高の標柱。数字は描かない(文字は使わない)。 */}
      <g>
        <rect x="236" y="128" width="5" height="38" fill="#8f8878" />
        <rect x="224" y="118" width="30" height="14" rx="2" fill="#efe7d4" />
        <g fill="#c8102e">
          <rect x="228" y="122" width="22" height="3" />
          <rect x="228" y="127" width="14" height="3" />
        </g>
      </g>

      {/* 停まったバス(右奥)。 */}
      <g>
        <rect x="296" y="124" width="86" height="34" rx="4" fill="#e8b21c" />
        <rect x="296" y="124" width="86" height="8" fill="#c8102e" />
        <g fill="#5c7080">
          <rect x="302" y="136" width="16" height="11" />
          <rect x="322" y="136" width="16" height="11" />
          <rect x="342" y="136" width="16" height="11" />
          <rect x="362" y="136" width="16" height="11" />
        </g>
        <g fill="#2f3238">
          <circle cx="312" cy="160" r="6" />
          <circle cx="368" cy="160" r="6" />
        </g>
      </g>

      {/* 座り込んだ旅人。頭を垂れ、膝に肘をついている。 */}
      <g transform="translate(96,0)">
        {/* 腰かけた岩 */}
        <ellipse cx="4" cy="176" rx="30" ry="12" fill="#8f8878" />
        <g className="peru-so-breath">
          <path d="M-14,172q-4,-24 4,-32h20q6,10 4,32z" fill="#2f6f9a" />
          <circle cx="2" cy="132" r="11" fill="#8a6a48" />
          <path d="M-9,130q11,-11 22,-1l2,-6q-11,-8 -25,1z" fill="#3f3a34" />
          <path d="M-12,120h28l-4,-5h-20z" fill="#c8102e" />
          <path
            d="M-12,150q-14,4 -18,16"
            stroke="#2f6f9a"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M14,150q12,4 14,14"
            stroke="#2f6f9a"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <path d="M-16,176q6,-14 18,-12l16,2q4,8 2,14z" fill="#4a4438" />
      </g>
      {/* 頭の重さ。**顔の上には置かない。**顔に輪を重ねると片眼鏡に見える。 */}
      <g
        className="peru-so-pulse"
        fill="none"
        stroke="#dfe8ee"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M84,112q6,-6 12,0M104,108q7,-7 14,0" />
      </g>

      {/* 膝をついてコカ茶を差し出す連れ。 */}
      <g transform="translate(160,0)">
        <path d="M-14,184q6,-30 16,-30q10,0 16,30z" fill="#c8102e" />
        <path d="M-10,168h24" stroke="#e8b21c" strokeWidth="4" fill="none" />
        <circle cx="2" cy="146" r="10" fill="#8a6a48" />
        <path d="M-8,142q10,-10 20,0q0,-9 -10,-9q-10,0 -10,9z" fill="#3f3a34" />
        <path
          d="M-6,152l-4,20M10,152l4,20"
          stroke="#3f3a34"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M-8,160q-16,2 -22,8"
          stroke="#c8102e"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        {/* 椀 */}
        <path d="M-40,170q9,-2 18,0q-2,8 -9,8q-7,0 -9,-8z" fill="#efe7d4" />
        <ellipse cx="-31" cy="170" rx="9" ry="2.6" fill="#8fae5a" />
        <g
          className="peru-so-steam"
          stroke="#f2ece0"
          strokeWidth="2"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
        >
          <path d="M-35,166q-4,-6 0,-11M-28,166q4,-6 0,-11" />
        </g>
      </g>

      {/* 薄い雲。ゆっくり流れる。 */}
      <g className="peru-so-cloud" fill="#dfe8ee" opacity="0.5">
        <ellipse cx="90" cy="52" rx="40" ry="7" />
        <ellipse cx="270" cy="70" rx="52" ry="8" />
      </g>

      <style>{`
        .peru-so-breath {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-so-inhale 4.2s ease-in-out infinite;
        }
        @keyframes peru-so-inhale {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.035) translateY(-1.5px); }
        }
        .peru-so-pulse {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-so-throb 1.8s ease-out infinite;
        }
        @keyframes peru-so-throb {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-4px); opacity: 0.9; }
        }
        .peru-so-steam {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-so-rise 2.6s ease-in-out infinite;
        }
        @keyframes peru-so-rise {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.4; }
          50% { transform: translateY(-5px) scaleY(1.3); opacity: 0.85; }
        }
        .peru-so-cloud {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-so-drift 9s linear infinite;
        }
        @keyframes peru-so-drift {
          0% { transform: translateX(-26px); }
          100% { transform: translateX(26px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-so-breath,
          .peru-so-pulse,
          .peru-so-steam,
          .peru-so-cloud { animation: none; }
        }
      `}</style>
    </svg>
  );
}
