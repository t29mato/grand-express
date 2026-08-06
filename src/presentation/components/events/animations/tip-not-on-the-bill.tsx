/**
 * 合計はまともに見えたが、そこにもう二割足すのが当然だと知らされる(減)。
 *
 *   - 小皿に載った伝票。カウンターの向こうの顔は、こちらを見たまま動かない
 *   - 硬貨を一枚置くたび、まだ足りないという間があく
 *   - 三枚目を置いて、ようやく皿が引かれていく
 */
export function TipNotOnTheBill() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 食堂の中 */}
      <rect width="400" height="210" fill="#4a3f4e" />
      <rect width="400" height="112" fill="#5c4f60" />
      <g fill="#6e5f72">
        <rect x="24" y="20" width="86" height="58" rx="4" />
        <rect x="290" y="20" width="86" height="58" rx="4" />
      </g>
      <g fill="#8a7a90">
        <rect x="32" y="28" width="70" height="10" />
        <rect x="32" y="46" width="70" height="10" />
        <rect x="298" y="28" width="70" height="10" />
        <rect x="298" y="46" width="70" height="10" />
      </g>

      {/* カウンターの向こうの店員 */}
      <g transform="translate(300,112)">
        <rect x="-24" y="-46" width="48" height="46" rx="12" fill="#3f8f7a" />
        <circle cx="0" cy="-58" r="15" fill="#f6efe2" />
        <path d="M-15,-62 a15,15 0 0 1 30,0z" fill="#3b2f2a" />
        <g fill="#2a2028">
          <circle className="tnb-eye" cx="-6" cy="-58" r="2.2" />
          <circle className="tnb-eye" cx="6" cy="-58" r="2.2" />
        </g>
        <path d="M-6,-50 q6,3 12,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 腕を組んで待っている */}
        <rect x="-30" y="-30" width="60" height="11" rx="5.5" fill="#357f6c" />
      </g>

      {/* カウンター */}
      <rect y="112" width="400" height="98" fill="#7a5a34" />
      <rect y="112" width="400" height="10" fill="#9a7444" />
      <rect y="150" width="400" height="4" fill="#6b4a2a" opacity="0.6" />

      {/* 伝票の載った小皿 */}
      <g className="tnb-tray">
        <ellipse cx="150" cy="176" rx="66" ry="17" fill="#8f9aa8" />
        <ellipse cx="150" cy="172" rx="58" ry="13" fill="#b0bcc4" />
        <g transform="rotate(-7 150 168)">
          <rect x="112" y="140" width="60" height="34" rx="2" fill="#f2ede0" />
          <g fill="#b0a894">
            <rect x="118" y="147" width="44" height="4" rx="2" />
            <rect x="118" y="155" width="34" height="4" rx="2" />
            <rect x="118" y="163" width="26" height="4" rx="2" />
          </g>
          <rect x="118" y="168" width="48" height="4" rx="2" fill="#c93a3a" />
        </g>
      </g>

      {/* 足していく硬貨 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="tnb-add-a" cx="196" cy="180" r="9" />
        <circle className="tnb-add-b" cx="214" cy="176" r="9" />
        <circle className="tnb-add-c" cx="232" cy="182" r="9" />
      </g>

      {/* 硬貨を置く手。袖まで描いて、誰の手なのかを分かるようにする */}
      <g className="tnb-hand">
        <rect x="252" y="118" width="150" height="30" rx="8" fill="#e8443f" />
        <rect x="252" y="118" width="12" height="30" fill="#c93a3a" />
        <rect x="228" y="120" width="30" height="28" rx="13" fill="#f6efe2" />
        <g fill="#f6efe2">
          <rect x="222" y="128" width="16" height="9" rx="4.5" />
          <rect x="224" y="139" width="14" height="8" rx="4" />
        </g>
      </g>

      <style>{`
        .tnb-tray {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: tnb-take 7s ease-in-out infinite;
        }
        .tnb-eye { animation: tnb-blink 5.2s steps(1, end) infinite; }
        .tnb-hand {
          transform-box: fill-box; transform-origin: 100% 0;
          animation: tnb-place 7s ease-in-out infinite;
        }
        .tnb-add-a { animation: tnb-drop 7s ease-out infinite; animation-delay: -6.3s; }
        .tnb-add-b { animation: tnb-drop 7s ease-out infinite; animation-delay: -4.9s; }
        .tnb-add-c { animation: tnb-drop 7s ease-out infinite; animation-delay: -3.5s; }
        @keyframes tnb-take {
          0%, 76% { transform: translate(0, 0); opacity: 1; }
          94%, 100% { transform: translate(44px, -8px); opacity: 0; }
        }
        @keyframes tnb-blink {
          0%, 92% { opacity: 1; }
          94%, 97% { opacity: 0; }
          98%, 100% { opacity: 1; }
        }
        @keyframes tnb-place {
          0%, 100% { transform: translate(0, 0); }
          8% { transform: translate(-6px, 14px); }
          16% { transform: translate(0, 0); }
          28% { transform: translate(-6px, 14px); }
          36% { transform: translate(0, 0); }
          48% { transform: translate(-6px, 14px); }
          56% { transform: translate(0, 0); }
        }
        @keyframes tnb-drop {
          0% { transform: translate(-4px, -46px); opacity: 0; }
          6% { opacity: 1; }
          14% { transform: translate(0, 0); opacity: 1; }
          92% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(30px, -10px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tnb-tray, .tnb-eye, .tnb-hand,
          .tnb-add-a, .tnb-add-b, .tnb-add-c { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
