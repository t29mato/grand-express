/**
 * 作業停止で示談金を払う羽目になる。
 *
 * 本文の芯は3つ。**刈り取り人夫が未払い賃金で仕事を放棄すること・
 * 予約済みの貨車まで列ごと止まること・現金を積んで示談が済むまで
 * 動かないこと。**
 *
 * 7枚の描き分けで、ここは**白昼のけだるい停止**の担当。急ぐ動きを
 * 入れない。人は5人、**全員ちがう色・ちがう姿勢**(座って足を振る・
 * 地面に座り帽子であおぐ・腕を組んで立つ・鉈を杖に立つ・机で金を数える)。
 *
 * 動くのは**足の揺れ・帽子であおぐ手・陽炎・机に積まれていく硬貨・
 * とまり木の鳥の首**。止めた状態でも、満載のまま止まった貨車列と
 * 机の上の金で分かる。
 */
export function CubaParoDeLosObreros() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白く暑い空 */}
      <rect width="400" height="210" fill="#dce4dc" />
      <rect width="400" height="46" fill="#d2dcd6" />
      <circle cx="200" cy="26" r="15" fill="#f6ecb2" />
      <circle cx="200" cy="26" r="22" fill="#f6ecb2" opacity="0.35" />

      {/* 遠景:止まった工場(煙が出ていない=挽いていない) */}
      <rect x="10" y="52" width="66" height="40" fill="#a8a494" />
      <rect x="10" y="52" width="66" height="4" fill="#8a8678" />
      <rect x="20" y="24" width="9" height="28" fill="#989484" />
      <rect x="50" y="18" width="10" height="34" fill="#989484" />
      <g fill="#7f8a92">
        <rect x="18" y="62" width="9" height="11" />
        <rect x="34" y="62" width="9" height="11" />
        <rect x="50" y="62" width="9" height="11" />
      </g>
      {/* 煙突の上には何も無い(それが異常) */}

      {/* 乾いた積込場 */}
      <rect y="92" width="400" height="118" fill="#cfc09a" />
      <rect y="92" width="400" height="10" fill="#c2b28a" />
      <rect y="170" width="400" height="40" fill="#c6b690" />

      {/* 線路と、満載のまま止まった貨車列 */}
      <g fill="#8a7a52">
        <rect x="0" y="118" width="400" height="3" />
      </g>
      <g fill="#6b5a3a">
        <rect x="6" y="116" width="7" height="7" />
        <rect x="28" y="116" width="7" height="7" />
        <rect x="50" y="116" width="7" height="7" />
        <rect x="72" y="116" width="7" height="7" />
        <rect x="94" y="116" width="7" height="7" />
        <rect x="116" y="116" width="7" height="7" />
        <rect x="138" y="116" width="7" height="7" />
        <rect x="160" y="116" width="7" height="7" />
        <rect x="182" y="116" width="7" height="7" />
        <rect x="204" y="116" width="7" height="7" />
        <rect x="226" y="116" width="7" height="7" />
        <rect x="248" y="116" width="7" height="7" />
        <rect x="270" y="116" width="7" height="7" />
        <rect x="292" y="116" width="7" height="7" />
        <rect x="314" y="116" width="7" height="7" />
        <rect x="336" y="116" width="7" height="7" />
        <rect x="358" y="116" width="7" height="7" />
        <rect x="380" y="116" width="7" height="7" />
      </g>
      <rect x="0" y="117" width="400" height="2.2" fill="#8a8f92" />
      <rect x="0" y="121.4" width="400" height="2.2" fill="#8a8f92" />

      {/* 貨車3両(キビ満載)。連結したまま動かない */}
      {[26, 148, 270].map((x, i) => (
        <g key={x} transform={`translate(${x},118)`}>
          <rect x="0" y="-22" width="92" height="17" fill={i === 1 ? "#6f6e5c" : "#6b6a5a"} />
          <rect x="0" y="-22" width="92" height="3" fill="#7f7e6c" />
          <g stroke="#4a4a40" strokeWidth="1.6" fill="none">
            <path d="M18,-22v17M46,-22v17M74,-22v17" />
          </g>
          <g stroke="#8f9a4a" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M4,-22q4,-11 10,-13M22,-22q4,-12 10,-14M40,-22q4,-11 10,-13M58,-22q4,-12 10,-14M76,-22q4,-11 10,-13" />
          </g>
          <g fill="#33302c">
            <circle cx="18" cy="-1" r="5" />
            <circle cx="74" cy="-1" r="5" />
          </g>
          <g fill="#8a8f92">
            <circle cx="18" cy="-1" r="1.6" />
            <circle cx="74" cy="-1" r="1.6" />
          </g>
        </g>
      ))}
      <path d="M118,108h30M240,108h30" stroke="#4a4a40" strokeWidth="2.6" fill="none" />

      {/* 陽炎(貨車の上でゆらぐ) */}
      <g className="cupa-haze" stroke="#f2ead0" strokeWidth="2.4" opacity="0.5" fill="none" strokeLinecap="round">
        <path d="M60,88q4,-4 8,0q4,4 8,0M180,84q4,-4 8,0q4,4 8,0M300,88q4,-4 8,0q4,4 8,0" />
      </g>

      {/* 1人目:貨車の縁に座って足を振る(緑シャツ) */}
      <g transform="translate(70,96)">
        <path d="M-6,-4h11l1,14H-7z" fill="#4f8f6a" />
        <circle cx="0" cy="-8.6" r="5.4" fill="#c98f5f" />
        <path d="M-5,2l-6,5M5,2l6,4" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
        <g className="cupa-leg1">
          <path d="M-3,10l-2,12" stroke="#3f3428" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
        <g className="cupa-leg2">
          <path d="M3,10l2,12" stroke="#3f3428" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 2人目:地面に座り、麦わら帽であおぐ(白シャツ) */}
      <g transform="translate(122,158)">
        <path d="M-7,-6h13l2,16H-9z" fill="#efe8d4" />
        <circle cx="0" cy="-10.6" r="5.4" fill="#b8794a" />
        <path d="M-9,10q9,4 18,0l-2,5H-7z" fill="#3f3428" />
        <path d="M-6,-4l-7,7" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <g className="cupa-fan">
          <path d="M6,-6l8,-3" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="17" cy="-11" rx="7" ry="3" fill="#d8bd7f" />
        </g>
      </g>

      {/* 3人目:腕を組んで立つ(青シャツ) */}
      <g transform="translate(174,150)">
        <rect x="-3.6" y="14" width="3.4" height="16" fill="#3f3428" />
        <rect x="0.6" y="14" width="3.4" height="16" fill="#3f3428" />
        <path d="M-6,-4h12l1.4,19H-7.4z" fill="#3f6b9a" />
        <circle cx="0" cy="-8.6" r="5.6" fill="#c98f5f" />
        <path d="M-6,0q6,4 12,0" stroke="#c98f5f" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </g>

      {/* 4人目:鉈を杖にして立つ(黄シャツ・麦わら帽) */}
      <g transform="translate(220,152)">
        <rect x="-3.6" y="14" width="3.4" height="16" fill="#3f3428" />
        <rect x="0.6" y="14" width="3.4" height="16" fill="#3f3428" />
        <path d="M-6,-4h12l1.4,19H-7.4z" fill="#e8b81f" />
        <circle cx="0" cy="-8.6" r="5.6" fill="#c98f5f" />
        <ellipse cx="0" cy="-12" rx="8.6" ry="2.4" fill="#d8bd7f" />
        <path d="M-4,-12q4,-5.6 8,0z" fill="#c8a95f" />
        <path d="M5,-2l8,8" stroke="#c98f5f" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        {/* 突き立てた鉈 */}
        <path d="M13,6l2,24" stroke="#8a8f92" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M11.4,4.4l4.4,1.6" stroke="#6b4a2f" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>

      {/* 机と、金を数える人(灰シャツ)。5人目 */}
      <g transform="translate(316,158)">
        <rect x="-26" y="0" width="60" height="5" fill="#8a6b43" />
        <g fill="#6b4a2f">
          <rect x="-22" y="5" width="4" height="20" />
          <rect x="26" y="5" width="4" height="20" />
        </g>
        {/* 帳面(白い紙。文字は書かない) */}
        <rect x="-18" y="-6" width="16" height="6" fill="#f2ead8" />
        <path d="M-16,-3h12" stroke="#c2b494" strokeWidth="1" fill="none" />
        {/* 積まれた硬貨(2山) */}
        <g fill="#e8c23f">
          <ellipse cx="8" cy="-2" rx="5" ry="1.8" />
          <ellipse cx="8" cy="-4.4" rx="5" ry="1.8" />
          <ellipse cx="8" cy="-6.8" rx="5" ry="1.8" />
        </g>
        <g fill="#d4ae2f">
          <ellipse cx="20" cy="-2" rx="5" ry="1.8" />
          <ellipse cx="20" cy="-4.4" rx="5" ry="1.8" />
        </g>
        {/* 落ちてくる1枚 */}
        <g className="cupa-coin">
          <ellipse cx="0" cy="0" rx="4.6" ry="1.7" fill="#f2d24f" />
        </g>
        {/* 数える人(机の向こう) */}
        <g transform="translate(2,-14)">
          <path d="M-6,-4h12l1.4,15H-7.4z" fill="#8a8f8a" />
          <circle cx="0" cy="-8.6" r="5.4" fill="#c98f5f" />
          <g className="cupa-count">
            <path d="M5,2l7,6" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
          <path d="M-5,2l-6,7" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* とまり木の鳥(時間だけが過ぎる) */}
      <g transform="translate(376,96)">
        <rect x="-1.6" y="0" width="3.2" height="26" fill="#8a7a52" />
        <g className="cupa-bird">
          <ellipse cx="0" cy="-4" rx="4.6" ry="3.2" fill="#5f6b70" />
          <circle cx="4" cy="-7" r="2.2" fill="#5f6b70" />
          <path d="M6,-7l2.6,0.8" stroke="#c8a13f" strokeWidth="1.2" fill="none" />
          <path d="M-4,-4q-3,1 -4,3" stroke="#4a545a" strokeWidth="1.6" fill="none" />
        </g>
      </g>

      {/* 手前の影と乾いた草 */}
      <ellipse cx="122" cy="172" rx="16" ry="3.4" fill="#000" opacity="0.12" />
      <ellipse cx="174" cy="182" rx="13" ry="3" fill="#000" opacity="0.12" />
      <ellipse cx="220" cy="184" rx="13" ry="3" fill="#000" opacity="0.12" />
      <ellipse cx="318" cy="186" rx="30" ry="4" fill="#000" opacity="0.12" />
      <g stroke="#a8945f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M20,200q3,-7 1,-12M56,206q3,-7 1,-12M362,202q3,-7 1,-12M390,208q3,-7 1,-12" />
      </g>

      <style>{`
        .cupa-leg1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cupa-dangle 2.6s ease-in-out infinite;
        }
        .cupa-leg2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cupa-dangle 2.6s ease-in-out 1.3s infinite;
        }
        @keyframes cupa-dangle {
          0%, 100% { transform: rotate(-9deg); }
          50%      { transform: rotate(9deg); }
        }
        .cupa-fan {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: cupa-wave 1.4s ease-in-out infinite;
        }
        @keyframes cupa-wave {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-18deg); }
        }
        .cupa-coin { animation: cupa-drop 2.4s ease-in infinite; }
        @keyframes cupa-drop {
          0%   { transform: translate(14px, -26px); opacity: 0; }
          15%  { opacity: 1; }
          55%  { transform: translate(14px, -8px); opacity: 1; }
          62%, 100% { transform: translate(14px, -8px); opacity: 0; }
        }
        .cupa-count {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: cupa-tap 2.4s ease-in-out infinite;
        }
        @keyframes cupa-tap {
          0%, 100% { transform: rotate(0deg); }
          30%      { transform: rotate(-14deg); }
          55%      { transform: rotate(0deg); }
        }
        .cupa-haze { animation: cupa-shimmer 2.8s ease-in-out infinite; }
        @keyframes cupa-shimmer {
          0%, 100% { transform: translateY(0); opacity: 0.32; }
          50%      { transform: translateY(-4px); opacity: 0.6; }
        }
        .cupa-bird {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cupa-peck 3.4s ease-in-out infinite;
        }
        @keyframes cupa-peck {
          0%, 84%, 100% { transform: rotate(0deg); }
          90%           { transform: rotate(10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cupa-leg1, .cupa-leg2, .cupa-fan, .cupa-coin, .cupa-count,
          .cupa-haze, .cupa-bird {
            animation: none;
          }
          /* 硬貨は山の上に載った位置で止める(払っている最中だと分かる)。 */
          .cupa-coin { transform: translate(14px, -8px); opacity: 1; }
          .cupa-haze { opacity: 0.35; }
        }
      `}</style>
    </svg>
  );
}
