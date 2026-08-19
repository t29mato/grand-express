/**
 * 地震が来る。町の小さな食料品店(ティエンディータ)。棚の瓶が踊り、
 * 吊り下げたランプが振り子になり、店主のおばあさんが膝を落として
 * 棚を押さえる。特定の災害年は示さない、日常のリスクとしての揺れ。
 *
 * 動くのは、部屋全体の小刻みな揺れ・振り子のランプ・棚の上で傾く瓶・
 * 床を転がる缶。止めても「揺れの最中」(傾いた額・散らばった缶・
 * 身構える人)が分かる。
 */
export function MexicoTemblor() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 店の中。土壁の暖色。 */}
      <rect width="400" height="210" fill="#c8a878" />
      <rect width="400" height="36" fill="#a8895f" />
      <rect y="164" width="400" height="46" fill="#8a6a4a" />
      <path d="M0,164 h400" stroke="#6b5334" strokeWidth="3" />

      {/* 小刻みに揺れる部屋の中身。 */}
      <g className="mxte-room">
        {/* 商品棚(左)。 */}
        <g>
          <rect x="20" y="52" width="130" height="112" fill="#a8744a" />
          <g fill="#8a5a3a">
            <rect x="26" y="76" width="118" height="6" />
            <rect x="26" y="110" width="118" height="6" />
            <rect x="26" y="144" width="118" height="6" />
          </g>
          {/* 上段: 傾く瓶たち。 */}
          <g className="mxte-jar1">
            <rect x="34" y="58" width="12" height="18" rx="2" fill="#3f8f4f" />
            <rect x="36" y="55" width="8" height="5" fill="#2f6b3f" />
          </g>
          <g className="mxte-jar2">
            <rect x="56" y="60" width="11" height="16" rx="2" fill="#e8443f" />
            <rect x="58" y="57" width="7" height="5" fill="#a83232" />
          </g>
          <g className="mxte-jar3">
            <rect x="78" y="58" width="12" height="18" rx="2" fill="#f4c430" />
            <rect x="80" y="55" width="8" height="5" fill="#d8a818" />
          </g>
          <rect x="102" y="62" width="14" height="14" rx="2" fill="#5b8fe8" />
          <rect x="122" y="60" width="13" height="16" rx="2" fill="#c86a8a" />
          {/* 中段: 袋と箱。 */}
          <path d="M34,110 a8,9 0 0 1 16,0 l-2,0 h-12 z" fill="#e8dcc0" />
          <path d="M56,110 a8,9 0 0 1 16,0 l-2,0 h-12 z" fill="#d8b878" />
          <rect x="80" y="94" width="18" height="16" fill="#c8383f" />
          <rect x="104" y="96" width="16" height="14" fill="#e88a3f" />
          <rect x="126" y="94" width="12" height="16" fill="#8a9478" />
          {/* 下段。 */}
          <rect x="34" y="128" width="20" height="16" fill="#b0a078" />
          <rect x="60" y="130" width="18" height="14" fill="#7a9a8a" />
          <rect x="84" y="128" width="22" height="16" fill="#e8dcc0" />
          <rect x="112" y="130" width="16" height="14" fill="#c8a050" />
        </g>

        {/* 壁の額(グアダルーペの聖画風の飾り枠)。傾いたまま。 */}
        <g transform="translate(230,74) rotate(-10)">
          <rect x="-14" y="-18" width="28" height="36" rx="3" fill="#c8a050" />
          <rect x="-10" y="-14" width="20" height="28" rx="2" fill="#2f6ea8" />
          <path d="M0,-9 a7,9 0 0 1 0,18 a7,9 0 0 1 0,-18" fill="#f4c430" />
        </g>
        {/* 壁の掛け時計も斜め。 */}
        <g transform="translate(320,64) rotate(7)">
          <circle r="11" fill="#f6efe2" stroke="#8a5a3a" strokeWidth="3" />
          <path d="M0,0 L0,-6 M0,0 L4,3" stroke="#4a4038" strokeWidth="1.6" />
        </g>

        {/* カウンターと店主。膝を落として棚を押さえる。 */}
        <rect x="286" y="122" width="100" height="42" fill="#a8744a" />
        <rect x="286" y="122" width="100" height="6" fill="#8a5a3a" />
        <g>
          {/* 落ちそうな秤。 */}
          <path d="M296,114 a9,7 0 0 1 18,0 z" fill="#8a9478" />
          <rect x="294" y="114" width="22" height="4" fill="#6b7a5f" />
        </g>
        <g>
          {/* 店主のおばあさん(エプロン+髪のおだんご)。 */}
          <path d="M226,166 L220,196" stroke="#6b4a5a" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M238,166 L244,196" stroke="#7a5568" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M220,132 L244,132 L250,170 L216,170 z" fill="#c86a8a" />
          <path d="M224,144 L242,144 L246,168 L220,168 z" fill="#f6efe2" />
          <circle cx="232" cy="122" r="10" fill="#b5835a" />
          <circle cx="232" cy="111" r="5" fill="#d8d0c8" />
          <path d="M226,120 q2,-2 4,0 M234,120 q2,-2 4,0" stroke="#2a1a10" strokeWidth="1.4" fill="none" />
          <ellipse cx="232" cy="127" rx="2.2" ry="1.4" fill="#2a1a10" />
          {/* 両腕で頭をかばう。 */}
          <path d="M224,140 Q214,132 218,122" stroke="#b5835a" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M240,140 Q250,132 246,122" stroke="#b5835a" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 吊りランプ。天井から振り子に。 */}
      <g className="mxte-lamp">
        <path d="M0,0 L0,34" stroke="#4a4038" strokeWidth="2.4" />
        <path d="M-9,34 h18 l-4,9 h-10 z" fill="#3f6b4f" />
        <circle cx="0" cy="46" r="4" fill="#f5b31c" />
      </g>

      {/* 床を転がる缶と、散らばった豆。 */}
      <g className="mxte-can">
        <rect x="-7" y="-5" width="14" height="10" rx="2" fill="#e8443f" />
        <circle cx="-7" cy="0" r="4.6" fill="#c8b8a8" />
      </g>
      <g fill="#8a6220">
        <circle cx="150" cy="196" r="1.8" />
        <circle cx="160" cy="200" r="1.8" />
        <circle cx="144" cy="202" r="1.8" />
        <circle cx="170" cy="197" r="1.8" />
      </g>

      <style>{`
        .mxte-room { animation: mxte-shake 0.34s linear infinite; }
        @keyframes mxte-shake {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(-1.6px, 0.6px); }
          50%      { transform: translate(1.2px, -0.6px); }
          75%      { transform: translate(-0.8px, 0.4px); }
        }
        .mxte-lamp {
          transform-box: view-box;
          transform-origin: 196px 36px;
          animation: mxte-swing 1.4s ease-in-out infinite;
        }
        @keyframes mxte-swing {
          0%, 100% { transform: translate(196px, 36px) rotate(-16deg); }
          50%      { transform: translate(196px, 36px) rotate(16deg); }
        }
        .mxte-jar1, .mxte-jar2, .mxte-jar3 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxte-tip 0.5s ease-in-out infinite;
        }
        .mxte-jar2 { animation-delay: -0.16s; }
        .mxte-jar3 { animation-delay: -0.32s; }
        @keyframes mxte-tip {
          0%, 100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg); }
        }
        .mxte-can { animation: mxte-roll 2.6s ease-in-out infinite; }
        @keyframes mxte-roll {
          0%   { transform: translate(184px, 186px) rotate(0deg); }
          50%  { transform: translate(148px, 190px) rotate(-260deg); }
          100% { transform: translate(184px, 186px) rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxte-room, .mxte-lamp, .mxte-jar1, .mxte-jar2, .mxte-jar3, .mxte-can {
            animation: none;
          }
          /* 止まっていても分かるように: ランプは振れた位置、缶は床、瓶は傾き。 */
          .mxte-lamp { transform: translate(196px, 36px) rotate(14deg); }
          .mxte-can { transform: translate(160px, 189px) rotate(-80deg); }
          .mxte-jar1 { transform: rotate(-7deg); }
          .mxte-jar2 { transform: rotate(6deg); }
          .mxte-jar3 { transform: rotate(-5deg); }
        }
      `}</style>
    </svg>
  );
}
