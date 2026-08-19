/**
 * 運河での座礁。コンテナ船が運河のいちばん狭い区間で横向きに嵌まり、
 * 両側の海へ向かって船の列が伸びる。抜け道は一つもない。
 *
 * 構図: 砂の両岸に挟まれた濃い青の水路を、巨大な船体が**斜めに突っ切って塞ぐ**。
 * 奥に待たされている船の列、船首側では小さなタグボート2隻が押している。
 * 手前の岸には、掘り出そうとしている小さなショベルカー。
 *
 * 動くのは4つ: タグの吐く白い泡、船体のごくわずかな揺れ(動かない重さを出す)、
 * 待ち船の上下、ショベルのアームの往復。
 * 止めても「水路を斜めに塞ぐ船と、後ろに詰まった船の列」で伝わる。
 */
export function EgyptCanalblock() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 砂漠の空。運河沿いは日差しが強い。 */}
      <rect width="400" height="210" fill="#d8bb87" />
      <rect width="400" height="86" fill="#8fbcd8" />
      <rect width="400" height="30" fill="#7fb0d0" />
      <circle cx="52" cy="34" r="18" fill="#f2d99a" />

      {/* 両岸の砂。水路は中央を横切る帯。 */}
      <rect y="86" width="400" height="124" fill="#d8bb87" />
      <path d="M0,86 q100,-6 200,0 t200,0 v12 H0z" fill="#e2c795" />
      <rect y="98" width="400" height="76" fill="#1f5d86" />
      <rect y="98" width="400" height="10" fill="#2a6f9c" />
      <g stroke="#4f93b8" strokeWidth="2" fill="none" opacity="0.55">
        <path d="M14,120 h58 M330,112 h56 M20,166 h44" />
      </g>

      {/* 足止めされている船の列。**両側の海へ向かって伸びている**のが要点なので、
          左右の端に色つきで、抜け道が無いことが分かる大きさで置く。 */}
      <g className="egypt-cb-queue">
        <g>
          <path d="M4,112 h58 l-7,11 H12z" fill="#c94f3c" />
          <rect x="4" y="104" width="58" height="9" fill="#2f4f68" />
          <rect x="18" y="94" width="17" height="11" fill="#e2d8c2" />
          <rect x="40" y="97" width="12" height="8" fill="#e8b21c" />
        </g>
        <g>
          <path d="M68,102 h42 l-5,8 H73z" fill="#3f7f6a" />
          <rect x="68" y="96" width="42" height="7" fill="#2f4f68" />
          <rect x="78" y="89" width="12" height="8" fill="#e2d8c2" />
        </g>
        <g>
          <path d="M336,110 h60 l-6,11 h-48z" fill="#2f6f9a" />
          <rect x="336" y="102" width="60" height="9" fill="#2f4f68" />
          <rect x="352" y="92" width="17" height="11" fill="#e2d8c2" />
          <rect x="374" y="95" width="12" height="8" fill="#c94f3c" />
        </g>
      </g>

      {/* 座礁したコンテナ船。斜めに水路を突っ切って両岸に触れている。 */}
      <g className="egypt-cb-hull">
        <path
          d="M6,150 L360,104 l7,26 q-6,12 -22,14 L28,176 q-18,-6 -22,-26z"
          fill="#1b4468"
        />
        <path d="M6,150 L360,104 l2,9 L8,159z" fill="#c33f34" />
        {/* 積んだコンテナ。段違いにして重さを出す。 */}
        <g>
          <rect
            x="60"
            y="122"
            width="30"
            height="11"
            fill="#c94f3c"
            transform="rotate(-7.4 60 122)"
          />
          <rect
            x="96"
            y="117"
            width="30"
            height="11"
            fill="#2f7fbe"
            transform="rotate(-7.4 96 117)"
          />
          <rect
            x="132"
            y="112"
            width="30"
            height="11"
            fill="#e8b21c"
            transform="rotate(-7.4 132 112)"
          />
          <rect
            x="168"
            y="107"
            width="30"
            height="11"
            fill="#3f9f7f"
            transform="rotate(-7.4 168 107)"
          />
          <rect
            x="204"
            y="102"
            width="30"
            height="11"
            fill="#c94f3c"
            transform="rotate(-7.4 204 102)"
          />
          <rect
            x="240"
            y="97"
            width="30"
            height="11"
            fill="#2f7fbe"
            transform="rotate(-7.4 240 97)"
          />
          <rect
            x="96"
            y="106"
            width="30"
            height="10"
            fill="#e8b21c"
            transform="rotate(-7.4 96 106)"
          />
          <rect
            x="168"
            y="96"
            width="30"
            height="10"
            fill="#c94f3c"
            transform="rotate(-7.4 168 96)"
          />
        </g>
        {/* 船橋と煙突。 */}
        <rect
          x="292"
          y="86"
          width="34"
          height="26"
          fill="#efe7d4"
          transform="rotate(-7.4 292 86)"
        />
        <g fill="#5c7080">
          <rect
            x="297"
            y="92"
            width="9"
            height="7"
            transform="rotate(-7.4 297 92)"
          />
          <rect
            x="310"
            y="90"
            width="9"
            height="7"
            transform="rotate(-7.4 310 90)"
          />
        </g>
        <rect
          x="304"
          y="70"
          width="9"
          height="17"
          fill="#e8b21c"
          transform="rotate(-7.4 304 70)"
        />
      </g>

      {/* 押しているタグボート2隻。泡だけが動く。 */}
      <g>
        <path d="M12,178 h40 l-6,11 H19z" fill="#2f6f5f" />
        <rect x="22" y="169" width="16" height="10" fill="#efe7d4" />
        <g className="egypt-cb-foam1" fill="#dff0f4" opacity="0.75">
          <ellipse cx="56" cy="180" rx="15" ry="5" />
          <ellipse cx="74" cy="184" rx="10" ry="4" />
        </g>
      </g>
      <g>
        <path d="M304,182 h36 l-5,10 h-27z" fill="#2f6f5f" />
        <rect x="312" y="174" width="14" height="9" fill="#efe7d4" />
        <g className="egypt-cb-foam2" fill="#dff0f4" opacity="0.7">
          <ellipse cx="296" cy="184" rx="13" ry="5" />
          <ellipse cx="280" cy="188" rx="9" ry="4" />
        </g>
      </g>

      {/* 手前の岸。ショベルカーが船首の下を掘る。 */}
      <rect y="174" width="400" height="36" fill="#cfae76" />
      <path d="M0,174 q110,-5 220,2 t180,-2 v10 H0z" fill="#dcbc86" />
      <g transform="translate(196,0)">
        <rect x="-16" y="186" width="34" height="15" rx="3" fill="#e8a41c" />
        <g fill="#4a4438">
          <circle cx="-8" cy="202" r="5" />
          <circle cx="10" cy="202" r="5" />
        </g>
        <g className="egypt-cb-arm">
          <path
            d="M14,188 L40,176"
            stroke="#e8a41c"
            strokeWidth="6"
            fill="none"
          />
          <path d="M38,172 l12,6 -5,11 -12,-6z" fill="#8f949c" />
        </g>
      </g>
      <path d="M228,196 q13,-10 28,0z" fill="#c09a62" />

      <style>{`
        .egypt-cb-hull {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-cb-stuck 5.4s ease-in-out infinite;
        }
        @keyframes egypt-cb-stuck {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(0.5deg) translateY(1px); }
        }
        .egypt-cb-queue {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-cb-bob 3.6s ease-in-out infinite;
        }
        @keyframes egypt-cb-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(2.5px); }
        }
        .egypt-cb-foam1 {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: egypt-cb-churn 1.3s ease-in-out infinite;
        }
        .egypt-cb-foam2 {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: egypt-cb-churn 1.7s ease-in-out -0.5s infinite;
        }
        @keyframes egypt-cb-churn {
          0%, 100% { transform: scaleX(0.8); opacity: 0.4; }
          50% { transform: scaleX(1.15); opacity: 0.85; }
        }
        .egypt-cb-arm {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: egypt-cb-scoop 2.2s ease-in-out infinite;
        }
        @keyframes egypt-cb-scoop {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-cb-hull,
          .egypt-cb-queue,
          .egypt-cb-foam1,
          .egypt-cb-foam2,
          .egypt-cb-arm { animation: none; }
        }
      `}</style>
    </svg>
  );
}
