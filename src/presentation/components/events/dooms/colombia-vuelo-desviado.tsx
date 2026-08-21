/**
 * 悪天候で便が目的地を変える(コロンビア盤の厄災 6/7・teleport)。
 *
 * 構図表の担当:**雲の中・空の視点・旋回する機体が主役・人0・白と藍。
 * 地上の人は描かない。**
 *
 * 降りるはずだった山あいの飛行場に雲が閉じ、双発機が旋回している。
 * 山頂は雲に沈みかけ、右下の遠くにだけ「開いている」別の飛行場の切れ間が見える。
 * 動くのは**流れる雲(2層の視差)・機体のわずかな上下と傾き・プロペラ・
 * 旋回軌跡の点線**。止めた状態でも、雲に沈む山+飛行場から離れる向きに
 * 傾いた機体で「降りられない」と分かる。
 */
export function ColombiaVueloDesviado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雲の中の白い空 */}
      <rect width="400" height="210" fill="#c8d0d4" />
      <rect y="120" width="400" height="90" fill="#b0bcc4" />

      {/* 雲間から覗く藍色の山なみ(目的地の側=左) */}
      <path d="M0,150 L56,86 L112,140 L160,104 L216,152 V210 H0 Z" fill="#3f4f6b" />
      <path d="M0,178 L80,140 L170,180 L240,150 L300,186 V210 H0 Z" fill="#33415c" />
      {/* 山あいの飛行場(雲に閉ざされている):滑走路がかすかに */}
      <path d="M84,166 l34,-8 l6,4 l-34,9 z" fill="#6f7a8a" opacity="0.8" />
      <path d="M88,167 l30,-8" stroke="#a8b0ba" strokeWidth="1.4" strokeDasharray="3 4" fill="none" opacity="0.8" />

      {/* 右下の遠く:開いている飛行場の切れ間(明るい) */}
      <g opacity="0.95">
        <path d="M300,182 q40,-12 100,-10 v38 h-100 z" fill="#8fa87a" />
        <path d="M320,192 l56,-8 l8,5 l-56,9 z" fill="#8a9298" />
        <path d="M324,193 l50,-8" stroke="#e8ecee" strokeWidth="1.6" strokeDasharray="4 5" fill="none" />
        <circle cx="382" cy="176" r="10" fill="#f2e8c8" opacity="0.55" />
      </g>

      {/* 雲:奥の層(ゆっくり) */}
      <g className="vds-cloudback" fill="#dfe4e6" opacity="0.95">
        <ellipse cx="60" cy="60" rx="90" ry="20" />
        <ellipse cx="240" cy="40" rx="110" ry="24" />
        <ellipse cx="380" cy="70" rx="80" ry="18" />
        <ellipse cx="150" cy="86" rx="70" ry="14" />
      </g>
      {/* 山頂を飲み込みつつある雲 */}
      <g className="vds-cloudpeak" fill="#e8eced" opacity="0.9">
        <ellipse cx="60" cy="100" rx="66" ry="14" />
        <ellipse cx="150" cy="116" rx="58" ry="12" />
        <ellipse cx="10" cy="120" rx="50" ry="12" />
      </g>

      {/* 旋回の軌跡(弧の点線)。**すでに2周している** */}
      <path
        className="vds-loop"
        d="M70,80 a120,34 0 1 0 240,10 a120,34 0 1 0 -240,-10"
        stroke="#f2f6f8"
        strokeWidth="2.6"
        strokeDasharray="10 12"
        fill="none"
        opacity="0.7"
      />

      {/* 双発機:白い機体。**飛行場から離れ、右下(開いた空)へ傾く** */}
      <g transform="translate(238,96) rotate(8)">
        <g className="vds-plane">
          {/* 主翼(奥) */}
          <path d="M-8,-2 L-38,-16 l-3,6 L-11,3 Z" fill="#b8c2c8" />
          {/* 胴体 */}
          <path d="M-46,0 q4,-8 16,-8 h52 q16,2 22,8 q-6,7 -22,8 h-52 q-12,0 -16,-8 z" fill="#f2f4f2" />
          <path d="M-46,0 h90" stroke="#c8d0d4" strokeWidth="1.6" fill="none" />
          {/* 窓の列とコックピット */}
          <g fill="#4a5866">
            <circle cx="-16" cy="-2.6" r="2.2" />
            <circle cx="-4" cy="-2.6" r="2.2" />
            <circle cx="8" cy="-2.6" r="2.2" />
            <circle cx="20" cy="-2.6" r="2.2" />
          </g>
          <path d="M34,-6 q8,1 10,4 l-10,1 z" fill="#4a5866" />
          {/* 尾翼 */}
          <path d="M-46,0 l-12,-16 h8 l10,12 z" fill="#c8452f" />
          <path d="M-44,4 l-14,4 l2,-6 l12,-2 z" fill="#d8dcd8" />
          {/* 主翼(手前)+エンジン+プロペラ */}
          <path d="M-4,2 L-40,22 l6,5 L0,7 Z" fill="#e0e6e6" />
          <ellipse cx="-24" cy="14" rx="7" ry="4.6" fill="#8a9298" />
          <g className="vds-prop">
            <ellipse cx="-31" cy="14" rx="2" ry="9" fill="#4a5866" opacity="0.75" />
          </g>
          <ellipse cx="12" cy="4" rx="7" ry="4.6" fill="#8a9298" />
          <g className="vds-prop2">
            <ellipse cx="5" cy="4" rx="2" ry="9" fill="#4a5866" opacity="0.75" />
          </g>
        </g>
      </g>

      {/* 雲:手前の層(速い。機体を時々かすめる) */}
      <g className="vds-cloudfront" fill="#f2f5f6" opacity="0.9">
        <ellipse cx="-40" cy="130" rx="90" ry="16" />
        <ellipse cx="120" cy="30" rx="80" ry="14" />
        <ellipse cx="330" cy="120" rx="70" ry="13" />
      </g>

      {/* 風の筋 */}
      <g stroke="#e8eef0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M30,150 q16,-5 32,0 M330,60 q16,-5 32,0" />
      </g>

      <style>{`
        .vds-cloudback { animation: vds-driftb 14s linear infinite; }
        @keyframes vds-driftb {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(-26px); }
          100% { transform: translateX(0); }
        }
        .vds-cloudpeak { animation: vds-rise 9s ease-in-out infinite; }
        @keyframes vds-rise {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-9px); }
        }
        .vds-cloudfront { animation: vds-driftf 8s linear infinite; }
        @keyframes vds-driftf {
          0%   { transform: translateX(0); }
          100% { transform: translateX(70px); }
        }
        .vds-plane {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vds-bob 4.6s ease-in-out infinite;
        }
        @keyframes vds-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          40%      { transform: translateY(-6px) rotate(-2deg); }
          70%      { transform: translateY(2px) rotate(1.4deg); }
        }
        .vds-prop, .vds-prop2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vds-spin 0.5s linear infinite;
        }
        @keyframes vds-spin {
          0%   { transform: scaleY(1); }
          50%  { transform: scaleY(0.15); }
          100% { transform: scaleY(1); }
        }
        .vds-loop { animation: vds-trail 5s linear infinite; }
        @keyframes vds-trail {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -66; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vds-cloudback, .vds-cloudpeak, .vds-cloudfront,
          .vds-plane, .vds-prop, .vds-prop2, .vds-loop {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
