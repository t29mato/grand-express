/**
 * 川が鉄橋を洗い流す。増水した茶色の川が橋脚をさらい、
 * 真ん中の橋桁が落ちて線路と枕木が宙にたわんで垂れている。
 *
 * 動くのは、流れる濁流の筋・流されていく丸太・降る雨・
 * ぶら下がった線路のかすかな揺れ。
 */
export function NewzealandFloodWashout() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨の空。 */}
      <rect width="400" height="210" fill="#5f6b78" />
      <rect y="0" width="400" height="56" fill="#4a5563" />
      <g fill="#57636f" opacity="0.9">
        <ellipse cx="80" cy="30" rx="70" ry="13" />
        <ellipse cx="240" cy="20" rx="80" ry="14" />
        <ellipse cx="360" cy="34" rx="60" ry="12" />
      </g>

      {/* 両岸の丘(雨に濡れた濃い緑)。 */}
      <path d="M0,102 q60,-22 120,-8 l0,116 H0 Z" fill="#2d5f45" />
      <path d="M400,98 q-60,-20 -110,-4 l0,116 h110 Z" fill="#2d5f45" />
      <g fill="#1f4a36">
        <ellipse cx="40" cy="96" rx="26" ry="8" />
        <ellipse cx="360" cy="92" rx="28" ry="8" />
      </g>

      {/* 増水した川。岸を越えかけている。 */}
      <rect y="128" width="400" height="82" fill="#8a6a44" />
      <rect y="128" width="400" height="10" fill="#9a7850" />
      {/* 濁流の筋(流れ続ける)。 */}
      <g className="nzfw-flow" stroke="#b8905c" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none">
        <path d="M-390,146 h44 M-310,166 h56 M-240,150 h40 M-160,182 h50 M-90,160 h44 M-30,192 h40" />
        <path d="M10,146 h44 M90,166 h56 M160,150 h40 M240,182 h50 M310,160 h44 M370,192 h40" />
      </g>
      {/* 白く泡立つ水面。 */}
      <g className="nzfw-foam" fill="#e8e0d0" opacity="0.7">
        <ellipse cx="-330" cy="138" rx="18" ry="3" />
        <ellipse cx="-180" cy="134" rx="22" ry="3.4" />
        <ellipse cx="-40" cy="140" rx="16" ry="3" />
        <ellipse cx="70" cy="138" rx="18" ry="3" />
        <ellipse cx="220" cy="134" rx="22" ry="3.4" />
        <ellipse cx="360" cy="140" rx="16" ry="3" />
      </g>
      {/* 流されていく丸太と枝。 */}
      <g className="nzfw-log">
        <rect x="0" y="152" width="46" height="8" rx="4" fill="#5a4630" />
        <path d="M40,152 l8,-7" stroke="#5a4630" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="4" cy="156" r="4" fill="#4a3a26" />
      </g>
      <g className="nzfw-log2">
        <rect x="0" y="176" width="30" height="6" rx="3" fill="#4a3a26" />
      </g>

      {/* 鉄橋。真ん中の橋脚が流され、桁が落ちている。 */}
      {/* 残った橋脚。 */}
      <g fill="#57534a">
        <rect x="96" y="112" width="12" height="60" />
        <rect x="292" y="110" width="12" height="62" />
      </g>
      {/* 流された橋脚の残骸(水面から突き出る)。 */}
      <path d="M196,150 l10,22 h-14 z" fill="#57534a" />
      {/* 左右の残った桁と線路。 */}
      <g>
        <rect x="0" y="104" width="140" height="8" fill="#6f6a5e" />
        <rect x="0" y="100" width="140" height="4" fill="#8a8578" />
        <g fill="#6b5330">
          <rect x="8" y="100" width="5" height="4" />
          <rect x="28" y="100" width="5" height="4" />
          <rect x="48" y="100" width="5" height="4" />
          <rect x="68" y="100" width="5" height="4" />
          <rect x="88" y="100" width="5" height="4" />
          <rect x="108" y="100" width="5" height="4" />
          <rect x="128" y="100" width="5" height="4" />
        </g>
        <rect x="262" y="102" width="138" height="8" fill="#6f6a5e" />
        <rect x="262" y="98" width="138" height="4" fill="#8a8578" />
        <g fill="#6b5330">
          <rect x="268" y="98" width="5" height="4" />
          <rect x="288" y="98" width="5" height="4" />
          <rect x="308" y="98" width="5" height="4" />
          <rect x="328" y="98" width="5" height="4" />
          <rect x="348" y="98" width="5" height="4" />
          <rect x="368" y="98" width="5" height="4" />
          <rect x="388" y="98" width="5" height="4" />
        </g>
      </g>
      {/* 宙にたわんで垂れる線路と枕木(かすかに揺れる)。 */}
      <g className="nzfw-rail">
        <path d="M140,104 q30,44 60,52 q32,6 62,-52" stroke="#8a8578" strokeWidth="3.4" fill="none" />
        <path d="M140,110 q30,42 60,49 q32,5 62,-49" stroke="#6f6a5e" strokeWidth="3" fill="none" />
        <g fill="#6b5330">
          <rect x="152" y="114" width="10" height="4" transform="rotate(38 157 116)" />
          <rect x="172" y="134" width="10" height="4" transform="rotate(26 177 136)" />
          <rect x="196" y="148" width="10" height="4" transform="rotate(6 201 150)" />
          <rect x="222" y="142" width="10" height="4" transform="rotate(-22 227 144)" />
          <rect x="244" y="122" width="10" height="4" transform="rotate(-40 249 124)" />
        </g>
      </g>

      {/* 手前の岸(増水した川がここまで来ている)。 */}
      <path d="M0,210 v-52 q46,-10 92,2 l16,50 z" fill="#3f6b4a" />
      <path d="M0,162 q46,-10 92,2 l4,12 q-48,-12 -96,-2 z" fill="#4f7f5a" />
      <path d="M300,210 v-24 q50,-8 100,2 v22 z" fill="#3f6b4a" />

      {/* 岸で見ている人(黄色い雨がっぱ)。 */}
      <ellipse cx="46" cy="196" rx="12" ry="3.4" fill="#000" opacity="0.2" />
      <g strokeLinecap="round">
        <path d="M43,178 L40,196" stroke="#3a4453" strokeWidth="5" fill="none" />
        <path d="M49,178 L52,196" stroke="#46536b" strokeWidth="5" fill="none" />
        <path d="M46,154 L46,180" stroke="#f5b31c" strokeWidth="14" fill="none" />
        <path d="M46,166 L60,158" stroke="#f5b31c" strokeWidth="4" fill="none" />
        <circle cx="46" cy="146" r="7" fill="#d9a273" />
        <path d="M38.5,146 a7.5,7.5 0 0 1 15,0 l0,3 q-7.5,-4 -15,0 z" fill="#f5b31c" />
      </g>

      {/* 降る雨(斜めの筋)。 */}
      <g className="nzfw-rain" stroke="#c4d4dc" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" fill="none">
        <path d="M20,-200 l-6,14 M80,-170 l-6,14 M140,-205 l-6,14 M200,-160 l-6,14 M260,-195 l-6,14 M320,-170 l-6,14 M380,-200 l-6,14" />
        <path d="M50,-90 l-6,14 M110,-60 l-6,14 M170,-100 l-6,14 M230,-55 l-6,14 M290,-85 l-6,14 M350,-65 l-6,14" />
        <path d="M20,10 l-6,14 M80,40 l-6,14 M140,5 l-6,14 M200,50 l-6,14 M260,15 l-6,14 M320,40 l-6,14 M380,10 l-6,14" />
        <path d="M50,120 l-6,14 M110,150 l-6,14 M170,110 l-6,14 M230,155 l-6,14 M290,125 l-6,14 M350,145 l-6,14" />
      </g>

      <style>{`
        .nzfw-flow { animation: nzfw-drift 3s linear infinite; }
        .nzfw-foam { animation: nzfw-drift 4.5s linear infinite; }
        .nzfw-log { animation: nzfw-float 7s linear infinite; }
        .nzfw-log2 { animation: nzfw-float 5s linear infinite; animation-delay: -2.5s; }
        .nzfw-rail {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: nzfw-sway 2.6s ease-in-out infinite alternate;
        }
        .nzfw-rain { animation: nzfw-pour 1.4s linear infinite; }
        @keyframes nzfw-drift {
          from { transform: translateX(0); }
          to { transform: translateX(400px); }
        }
        @keyframes nzfw-float {
          from { transform: translateX(-60px) }
          to { transform: translateX(420px); }
        }
        @keyframes nzfw-sway {
          from { transform: translateX(-3px); }
          to { transform: translateX(3px); }
        }
        @keyframes nzfw-pour {
          from { transform: translateY(0); }
          to { transform: translateY(210px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nzfw-flow, .nzfw-foam, .nzfw-log, .nzfw-log2, .nzfw-rail, .nzfw-rain {
            animation: none;
          }
          /* 止めた状態でも、丸太が川の真ん中に見えるようにする。 */
          .nzfw-log { transform: translateX(160px); }
          .nzfw-log2 { transform: translateX(300px); }
        }
      `}</style>
    </svg>
  );
}
