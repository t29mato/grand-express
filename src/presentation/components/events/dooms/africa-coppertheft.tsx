/**
 * 架線の銅線盗難。夜の電化区間で、架線の一径間だけが切り取られて無い。
 * 電車はパンタグラフを上げたまま、切れ目の手前で止まっている。
 *
 * 動くのは3つ: 切られて垂れた線の端がゆれる、銅線のコイルを担いだ人物が
 * 右へ立ち去る、コイルがときどき月明かりで光る。
 * 止めた状態でも「架線が一区間欠け、コイルを担いだ人がいる」構図で伝わる。
 */
export function AfricaCoppertheft() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜空と月。 */}
      <rect width="400" height="210" fill="#1c2a44" />
      <rect width="400" height="70" fill="#16223a" />
      <circle cx="330" cy="42" r="18" fill="#e8e4d0" />
      <circle cx="323" cy="38" r="4" fill="#cfc9b4" opacity="0.6" />
      <g fill="#e8e4d0" opacity="0.8">
        <circle cx="40" cy="30" r="1.6" />
        <circle cx="96" cy="52" r="1.2" />
        <circle cx="160" cy="24" r="1.4" />
        <circle cx="228" cy="44" r="1.2" />
        <circle cx="270" cy="20" r="1.6" />
        <circle cx="382" cy="72" r="1.2" />
      </g>

      {/* 中景: 高原の丘とまばらな灯。 */}
      <path d="M0,130 q70,-26 140,-10 q80,18 160,-6 q60,-16 100,2 v30 H0z" fill="#243450" />
      <g fill="#f5b31c" opacity="0.7">
        <circle cx="66" cy="126" r="1.8" />
        <circle cx="84" cy="130" r="1.4" />
        <circle cx="356" cy="128" r="1.8" />
      </g>

      {/* 地面と線路。 */}
      <rect y="146" width="400" height="64" fill="#2e3038" />
      <rect y="168" width="400" height="8" fill="#3a3428" />
      <g fill="#4a4438">
        <rect x="6" y="169" width="10" height="6" />
        <rect x="34" y="169" width="10" height="6" />
        <rect x="62" y="169" width="10" height="6" />
        <rect x="90" y="169" width="10" height="6" />
        <rect x="118" y="169" width="10" height="6" />
        <rect x="146" y="169" width="10" height="6" />
        <rect x="174" y="169" width="10" height="6" />
        <rect x="202" y="169" width="10" height="6" />
        <rect x="230" y="169" width="10" height="6" />
        <rect x="258" y="169" width="10" height="6" />
        <rect x="286" y="169" width="10" height="6" />
        <rect x="314" y="169" width="10" height="6" />
        <rect x="342" y="169" width="10" height="6" />
        <rect x="370" y="169" width="10" height="6" />
      </g>
      <rect y="166" width="400" height="3" fill="#6b6a62" />

      {/* 架線柱3本。左と中央の径間には線があり、右の径間だけ無い。 */}
      <g stroke="#7a7f88" strokeWidth="4" fill="none">
        <path d="M60,166 V84 h20" />
        <path d="M190,166 V84 h20" />
        <path d="M320,166 V84 h20" />
      </g>
      {/* 残っている架線(左〜中央)。 */}
      <path d="M78,92 Q134,100 208,92" stroke="#c96f2a" strokeWidth="2.4" fill="none" />
      {/* 切られた両端(ここが動く)。 */}
      <g className="africa-ct-dangle-l">
        <path d="M208,92 q4,14 -2,26" stroke="#c96f2a" strokeWidth="2.4" fill="none" />
      </g>
      <g className="africa-ct-dangle-r">
        <path d="M338,92 q-4,14 2,26" stroke="#c96f2a" strokeWidth="2.4" fill="none" />
      </g>

      {/* 切れ目の手前で止まった電車(左)。パンタグラフは残った線に触れている。 */}
      <g>
        <rect x="8" y="128" width="150" height="38" rx="5" fill="#3f6b52" />
        <rect x="8" y="128" width="150" height="9" fill="#e8b020" />
        <g fill="#20364a">
          <rect x="20" y="142" width="18" height="14" rx="2" />
          <rect x="48" y="142" width="18" height="14" rx="2" />
          <rect x="76" y="142" width="18" height="14" rx="2" />
          <rect x="104" y="142" width="18" height="14" rx="2" />
        </g>
        <path d="M158,128 q10,14 8,38 h-8z" fill="#3f6b52" />
        {/* 前照灯は点いたまま、行く手を照らす。 */}
        <circle cx="160" cy="152" r="4" fill="#f5b31c" />
        <path d="M164,148 L216,140 L216,164 L164,158z" fill="#f5b31c" opacity="0.18" />
        {/* パンタグラフ。 */}
        <path d="M78,128 l14,-12 l14,12" stroke="#8a8f98" strokeWidth="3" fill="none" />
        <path d="M84,95 h16" stroke="#8a8f98" strokeWidth="3" />
        <path d="M92,95 l0,21" stroke="#8a8f98" strokeWidth="3" />
        <circle cx="146" cy="168" r="6" fill="#1c2026" />
        <circle cx="30" cy="168" r="6" fill="#1c2026" />
        <circle cx="60" cy="168" r="6" fill="#1c2026" />
      </g>

      {/* コイルを担いで立ち去る人物(右)。位置決めは外の g、動きは内の g。 */}
      <g transform="translate(268,0)">
        <g className="africa-ct-thief">
          {/* 銅線のコイル。 */}
          <g className="africa-ct-coil">
            <circle cx="8" cy="128" r="13" fill="none" stroke="#c96f2a" strokeWidth="7" />
            <circle cx="8" cy="128" r="13" fill="none" stroke="#e8a15a" strokeWidth="2" />
          </g>
          {/* 体。前かがみの歩き姿。 */}
          <circle cx="-4" cy="122" r="7" fill="#6b4a34" />
          <path d="M-4,129 q-6,10 -4,24" stroke="#465a78" strokeWidth="9" fill="none" />
          <path d="M-7,152 l-7,14 M-6,152 l6,14" stroke="#2e3a50" strokeWidth="5" fill="none" />
          <path d="M-6,134 q8,-4 12,-4" stroke="#465a78" strokeWidth="5" fill="none" />
        </g>
      </g>

      {/* 切り落とされた線の切れ端が枕木の上に残る。 */}
      <path d="M244,164 q8,-8 16,0 q-8,6 -16,0" fill="none" stroke="#c96f2a" strokeWidth="2.4" />

      <style>{`
        .africa-ct-dangle-l {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: africa-ct-sway 2.6s ease-in-out infinite;
        }
        .africa-ct-dangle-r {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: africa-ct-sway 2.6s ease-in-out -1.3s infinite;
        }
        @keyframes africa-ct-sway {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-6deg); }
        }
        .africa-ct-thief {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: africa-ct-walk 5.2s linear infinite;
        }
        @keyframes africa-ct-walk {
          0% { transform: translateX(0); opacity: 0; }
          8% { opacity: 1; }
          25% { transform: translateX(22px) translateY(-2px); }
          50% { transform: translateX(44px) translateY(0); }
          75% { transform: translateX(66px) translateY(-2px); }
          92% { opacity: 1; }
          100% { transform: translateX(88px) translateY(0); opacity: 0; }
        }
        .africa-ct-coil {
          animation: africa-ct-glint 5.2s linear infinite;
        }
        @keyframes africa-ct-glint {
          0%, 88%, 100% { opacity: 1; }
          92% { opacity: 0.55; }
          96% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-ct-dangle-l,
          .africa-ct-dangle-r,
          .africa-ct-thief,
          .africa-ct-coil { animation: none; }
        }
      `}</style>
    </svg>
  );
}
