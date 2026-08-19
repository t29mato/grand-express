/**
 * ハリケーンが上陸する。海岸通りの椰子が撓み、トタン板が空を舞い、
 * 黄色い雨合羽の漁師が舫い綱を握って風に耐える。
 *
 * 動くのは、しなる椰子・宙を回るトタン板・斜めの雨。
 * 止めても「嵐に耐えている」構図(撓んだ椰子+宙の板+踏ん張る人)が残る。
 */
export function MexicoHuracan() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 嵐の空と海。 */}
      <rect width="400" height="210" fill="#2a3e48" />
      <rect width="400" height="80" fill="#22333c" />
      <g fill="#1b2930">
        <ellipse cx="80" cy="30" rx="70" ry="18" />
        <ellipse cx="240" cy="18" rx="90" ry="20" />
        <ellipse cx="360" cy="36" rx="66" ry="16" />
      </g>
      {/* 荒れた海(左)。 */}
      <rect y="112" width="180" height="98" fill="#28566e" />
      <g stroke="#7fb8d8" strokeWidth="3" fill="none" opacity="0.8">
        <path d="M0,124 q14,-8 28,0 t28,0 t28,0 t28,0 t28,0 t28,0" />
        <path d="M0,150 q16,-9 32,0 t32,0 t32,0 t32,0 t32,0" />
      </g>
      {/* 海岸通り。 */}
      <path d="M180,112 L400,104 L400,210 L150,210 z" fill="#5a5f52" />
      <rect x="150" y="204" width="250" height="6" fill="#4a4f42" />

      {/* 建物(右)。雨戸を打ちつけた家。 */}
      <g>
        <rect x="300" y="118" width="86" height="70" fill="#c8a878" />
        <rect x="296" y="110" width="94" height="10" fill="#8a5a3a" />
        <rect x="312" y="136" width="22" height="26" fill="#6b4a2a" />
        <path d="M312,136 l22,26 M334,136 l-22,26" stroke="#8a6a44" strokeWidth="3" />
        <rect x="350" y="136" width="22" height="26" fill="#6b4a2a" />
        <path d="M350,136 l22,26 M372,136 l-22,26" stroke="#8a6a44" strokeWidth="3" />
      </g>

      {/* 舫った小舟(引き上げてある)。 */}
      <path d="M186,190 c10,-5 34,-5 44,0 l-5,8 h-34 z" fill="#c8383f" />
      <path d="M206,190 l24,-4" stroke="#8a7a5f" strokeWidth="2" fill="none" />

      {/* しなる椰子。**根元を軸に揺れる。** */}
      <g transform="translate(178,208) scale(1.6)">
        <g className="mxhu-palm">
          <path d="M0,0 q4,-24 22,-40" stroke="#8a6a44" strokeWidth="5" fill="none" />
          <g stroke="#2f8f4f" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M22,-40 q18,2 30,10" />
            <path d="M22,-40 q20,-4 34,0" />
            <path d="M22,-40 q16,-10 30,-10" />
            <path d="M22,-40 q6,-14 16,-18" />
          </g>
        </g>
      </g>

      {/* 風に耐える漁師(黄色い雨合羽)。前傾して綱を握る。 */}
      <g transform="translate(250,0)">
        <ellipse cx="8" cy="198" rx="15" ry="3.6" fill="#141a12" opacity="0.4" />
        <g className="mxhu-fisher">
          {/* 踏ん張る脚。 */}
          <path d="M4,178 L-6,196" stroke="#2f4a33" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M10,178 L20,196" stroke="#3d5a40" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* 合羽の胴(前傾)。 */}
          <path d="M-2,150 L20,158 L16,182 L-4,178 z" fill="#f4c430" />
          <path d="M-2,158 L18,165" stroke="#d8a818" strokeWidth="2" />
          {/* フードの頭。 */}
          <circle cx="-8" cy="148" r="9" fill="#f4c430" />
          <circle cx="-10" cy="149" r="5.5" fill="#c98a5f" />
          <circle cx="-12" cy="148" r="1.2" fill="#2a1a10" />
          {/* 綱を握る両腕。 */}
          <path d="M0,158 L-24,166" stroke="#f4c430" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M4,164 L-20,172" stroke="#d8a818" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
        {/* 舫い綱(舟へ)。 */}
        <path d="M-24,168 q-20,10 -40,20" stroke="#c8b890" strokeWidth="3" fill="none" />
      </g>

      {/* 宙を舞うトタン板。**回りながら流れていく。** */}
      <g className="mxhu-sheet">
        <rect x="-16" y="-9" width="32" height="18" rx="2" fill="#9aa0a8" />
        <path d="M-16,-3 h32 M-16,3 h32" stroke="#7a8088" strokeWidth="1.6" />
      </g>
      {/* ちぎれた看板も飛ぶ。 */}
      <g className="mxhu-sign">
        <rect x="-10" y="-7" width="20" height="14" rx="2" fill="#e8443f" />
        <circle cx="0" cy="0" r="3.4" fill="#f6efe2" />
      </g>

      {/* 斜めの雨(2層でループ)。 */}
      <g className="mxhu-rain">
        <g stroke="#9ec4d8" strokeWidth="2" opacity="0.7">
          <path d="M20,0 l-14,26 M70,-6 l-14,26 M120,2 l-14,26 M170,-4 l-14,26 M220,0 l-14,26 M270,-6 l-14,26 M320,2 l-14,26 M370,-2 l-14,26" />
          <path d="M45,60 l-14,26 M95,54 l-14,26 M145,62 l-14,26 M195,56 l-14,26 M245,60 l-14,26 M295,54 l-14,26 M345,62 l-14,26 M395,58 l-14,26" />
        </g>
      </g>
      <g className="mxhu-rain2">
        <g stroke="#9ec4d8" strokeWidth="2" opacity="0.5">
          <path d="M35,30 l-14,26 M85,24 l-14,26 M135,32 l-14,26 M185,26 l-14,26 M235,30 l-14,26 M285,24 l-14,26 M335,32 l-14,26 M385,28 l-14,26" />
        </g>
      </g>

      <style>{`
        .mxhu-palm {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: mxhu-bend 1.6s ease-in-out infinite;
        }
        @keyframes mxhu-bend {
          0%, 100% { transform: rotate(-26deg); }
          50%      { transform: rotate(-14deg); }
        }
        .mxhu-fisher {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxhu-brace 1.6s ease-in-out infinite;
        }
        @keyframes mxhu-brace {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-3deg); }
        }
        .mxhu-sheet { animation: mxhu-fly 3.2s linear infinite; }
        @keyframes mxhu-fly {
          0%   { transform: translate(430px, 60px) rotate(0deg); }
          100% { transform: translate(-40px, 20px) rotate(-540deg); }
        }
        .mxhu-sign { animation: mxhu-fly2 4.1s linear infinite; }
        @keyframes mxhu-fly2 {
          0%   { transform: translate(420px, 100px) rotate(0deg); }
          100% { transform: translate(-30px, 46px) rotate(420deg); }
        }
        .mxhu-rain { animation: mxhu-pour 0.7s linear infinite; }
        .mxhu-rain2 { animation: mxhu-pour 0.7s linear infinite; animation-delay: -0.35s; }
        @keyframes mxhu-pour {
          from { transform: translate(14px, -26px); }
          to   { transform: translate(-14px, 26px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxhu-palm, .mxhu-fisher, .mxhu-sheet, .mxhu-sign,
          .mxhu-rain, .mxhu-rain2 {
            animation: none;
          }
          /* 止まっていても分かるように: 椰子は撓み、板と看板は宙に固定。 */
          .mxhu-palm { transform: rotate(-24deg); }
          .mxhu-sheet { transform: translate(210px, 48px) rotate(-30deg); }
          .mxhu-sign { transform: translate(120px, 84px) rotate(24deg); }
        }
      `}</style>
    </svg>
  );
}
