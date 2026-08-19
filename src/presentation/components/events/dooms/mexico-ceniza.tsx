/**
 * 火山灰が降る。遠くでポポカテペトルが噴煙を上げ、灰色の粉が
 * 雪のように町へ降り積もる。洗濯物は薄灰色になり、マスクをした
 * 清掃員が箒で灰を掃く。
 *
 * 動くのは、降る灰(2層)・膨らむ噴煙・箒を動かす腕。
 * 止めても「灰に覆われた町」(積もった灰+灰色の洗濯物+噴煙柱)が分かる。
 */
export function MexicoCeniza() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰に霞んだ薄紫の空。 */}
      <rect width="400" height="210" fill="#a8a0ac" />
      <rect width="400" height="70" fill="#b8b2bc" />

      {/* 遠くの火山と噴煙。 */}
      <path d="M240,140 L310,52 L378,140 z" fill="#6b5f6b" />
      <path d="M296,72 L310,52 L325,72 L318,79 L303,78 z" fill="#d8d4d8" />
      <g className="mxce-plume">
        <ellipse cx="310" cy="38" rx="16" ry="10" fill="#7a7078" />
        <ellipse cx="318" cy="26" rx="12" ry="8" fill="#8a8088" />
        <ellipse cx="308" cy="16" rx="9" ry="6" fill="#9a929c" />
      </g>

      {/* 町並み(灰をかぶって色が沈む)。 */}
      <rect y="140" width="400" height="70" fill="#8a848a" />
      <g>
        <rect x="14" y="104" width="70" height="52" fill="#b0888a" />
        <rect x="10" y="98" width="78" height="9" fill="#8a6a6c" />
        <rect x="30" y="122" width="16" height="20" fill="#5a4a4c" />
        <rect x="56" y="122" width="16" height="14" fill="#6b5a5c" />
        {/* 屋根に積もった灰。 */}
        <path d="M10,98 h78 v4 q-39,3 -78,0 z" fill="#d8d4d8" />
      </g>
      <g>
        <rect x="96" y="112" width="58" height="44" fill="#8a9a8c" />
        <rect x="92" y="106" width="66" height="8" fill="#6b7a6c" />
        <rect x="108" y="126" width="14" height="16" fill="#5a625a" />
        <path d="M92,106 h66 v4 q-33,3 -66,0 z" fill="#d8d4d8" />
      </g>

      {/* 物干しの洗濯物(白いはずが薄灰色)。 */}
      <g>
        <path d="M170,110 q40,10 80,0" stroke="#5a545a" strokeWidth="2" fill="none" />
        <rect x="182" y="112" width="16" height="20" fill="#c4c0c4" />
        <rect x="206" y="115" width="14" height="17" fill="#bab4ba" />
        <path d="M228,114 l12,1 l-2,17 l-12,-2 z" fill="#c4c0c4" />
        <rect x="170" y="106" width="3" height="60" fill="#6b5f61" />
        <rect x="248" y="106" width="3" height="60" fill="#6b5f61" />
      </g>

      {/* 通り。灰の吹きだまり。 */}
      <rect y="176" width="400" height="34" fill="#7a747a" />
      <g fill="#d8d4d8">
        <ellipse cx="60" cy="182" rx="34" ry="4" />
        <ellipse cx="180" cy="186" rx="28" ry="3.4" />
        <ellipse cx="330" cy="183" rx="40" ry="4.4" />
        <ellipse cx="252" cy="181" rx="18" ry="2.6" />
      </g>
      {/* 灰をかぶった車。 */}
      <g>
        <path d="M296,168 q4,-10 16,-10 h26 q12,0 16,10 l2,8 h-62 z" fill="#7a8a94" />
        <path d="M300,166 q3,-6 12,-6 h24 q9,0 12,6 z" fill="#d8d4d8" />
        <circle cx="310" cy="178" r="5" fill="#3a3a3e" />
        <circle cx="344" cy="178" r="5" fill="#3a3a3e" />
      </g>

      {/* 灰を掃く清掃員(青い作業着+マスク)。 */}
      <g transform="translate(120,0)">
        <ellipse cx="0" cy="204" rx="14" ry="3.2" fill="#3a3a3e" opacity="0.4" />
        <path d="M-4,172 L-8,202" stroke="#2f4a5a" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M4,172 L8,202" stroke="#3a5a6c" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M-9,142 L9,142 L12,176 L-12,176 z" fill="#3f6b8a" />
        <circle cx="0" cy="132" r="9.5" fill="#c98a5f" />
        <path d="M-9,128 a9.5,9.5 0 0 1 18,0" fill="#e8862f" />
        <circle cx="-3.4" cy="129.5" r="1.2" fill="#2a1a10" />
        <circle cx="3.4" cy="129.5" r="1.2" fill="#2a1a10" />
        {/* 防塵マスク。 */}
        <rect x="-6" y="132" width="12" height="7.5" rx="3" fill="#e8e4e8" />
        <path d="M-6,134 L-9.5,131 M6,134 L9.5,131" stroke="#c8c4c8" strokeWidth="1.4" />
        {/* 箒を持つ腕と箒。**腕ごと掃く。** */}
        <g className="mxce-sweep">
          <path d="M6,150 L26,164" stroke="#c98a5f" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M26,164 L44,196" stroke="#a8744a" strokeWidth="3.4" />
          <path d="M38,196 l12,0 l-4,10 l-10,-2 z" fill="#c8a050" />
          <path d="M40,198 l-2,7 M44,199 l-1,6 M48,199 l-2,6" stroke="#8a6a2f" strokeWidth="1.2" />
        </g>
        {/* 掃き寄せた灰の山。 */}
        <path d="M52,206 q10,-8 22,0 z" fill="#d8d4d8" />
      </g>

      {/* 降る灰(2層でループ)。 */}
      <g className="mxce-ash1" fill="#e4e0e4">
        <circle cx="30" cy="10" r="2" />
        <circle cx="80" cy="-8" r="1.6" />
        <circle cx="130" cy="16" r="2" />
        <circle cx="180" cy="-14" r="1.6" />
        <circle cx="230" cy="6" r="2" />
        <circle cx="280" cy="-4" r="1.6" />
        <circle cx="330" cy="12" r="2" />
        <circle cx="380" cy="-10" r="1.6" />
        <circle cx="55" cy="-40" r="1.6" />
        <circle cx="155" cy="-52" r="2" />
        <circle cx="255" cy="-44" r="1.6" />
        <circle cx="355" cy="-56" r="2" />
      </g>
      <g className="mxce-ash2" fill="#cfc9cf">
        <circle cx="18" cy="-20" r="1.4" />
        <circle cx="68" cy="4" r="1.8" />
        <circle cx="118" cy="-26" r="1.4" />
        <circle cx="168" cy="8" r="1.8" />
        <circle cx="218" cy="-18" r="1.4" />
        <circle cx="268" cy="12" r="1.8" />
        <circle cx="318" cy="-24" r="1.4" />
        <circle cx="368" cy="2" r="1.8" />
      </g>

      <style>{`
        .mxce-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxce-puff 3.4s ease-in-out infinite;
        }
        @keyframes mxce-puff {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.14, 1.22); }
        }
        .mxce-ash1 { animation: mxce-fall 5.2s linear infinite; }
        .mxce-ash2 { animation: mxce-fall 5.2s linear infinite; animation-delay: -2.6s; }
        @keyframes mxce-fall {
          from { transform: translate(0, -40px); }
          to   { transform: translate(-18px, 210px); }
        }
        .mxce-sweep {
          transform-box: fill-box;
          transform-origin: 10% 10%;
          animation: mxce-broom 1.5s ease-in-out infinite;
        }
        @keyframes mxce-broom {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(13deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxce-plume, .mxce-ash1, .mxce-ash2, .mxce-sweep {
            animation: none;
          }
          /* 止まっていても分かるように: 灰は空中に散った位置で固定。 */
          .mxce-ash1 { transform: translate(-6px, 70px); }
          .mxce-ash2 { transform: translate(-12px, 130px); }
        }
      `}</style>
    </svg>
  );
}
