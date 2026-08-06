/**
 * 料金所づくし。遮断機のたびに領収書が一枚、財布から硬貨が一枚。
 *
 * 州を抜けるころには、ほかの誰よりも財布が軽くなっている。
 * 奥からは次の遮断機がまた近づいてくる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaTollgate() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 埃っぽい夕方 */}
      <rect width="400" height="210" fill="#2b3a4a" />
      <rect y="70" width="400" height="46" fill="#3c4a52" />
      <g fill="#33424e">
        <path d="M0,96 L40,72 L80,96z" />
        <path d="M62,96 L104,66 L146,96z" />
        <path d="M300,96 L340,74 L380,96z" />
      </g>

      {/* まだ先にも続く料金所 */}
      <g opacity="0.45">
        <rect x="26" y="98" width="26" height="26" fill="#5c4d3a" />
        <rect x="24" y="94" width="30" height="6" rx="2" fill="#6b593f" />
        <rect x="52" y="102" width="4" height="22" fill="#3d4650" />
        <rect x="24" y="104" width="30" height="4" fill="#e05252" />
        <rect x="32" y="104" width="7" height="4" fill="#e8e2d2" />
      </g>
      <g opacity="0.68">
        <rect x="92" y="94" width="34" height="34" fill="#67563f" />
        <rect x="88" y="88" width="42" height="8" rx="2" fill="#7a6746" />
        <rect x="126" y="98" width="5" height="30" fill="#414b55" />
        <rect x="88" y="102" width="40" height="5" fill="#e05252" />
        <rect x="98" y="102" width="9" height="5" fill="#e8e2d2" />
        <rect x="116" y="102" width="9" height="5" fill="#e8e2d2" />
      </g>

      {/* 奥から迫る次の遮断機 */}
      <g transform="translate(150,104)">
        <g className="itg-next-a">
          <rect x="-2" y="-16" width="5" height="22" fill="#4a5560" />
          <rect x="0" y="-14" width="46" height="5" fill="#e05252" />
          <rect x="12" y="-14" width="10" height="5" fill="#e8e2d2" />
          <rect x="32" y="-14" width="10" height="5" fill="#e8e2d2" />
        </g>
      </g>
      <g transform="translate(150,104)">
        <g className="itg-next-b">
          <rect x="-2" y="-16" width="5" height="22" fill="#4a5560" />
          <rect x="0" y="-14" width="46" height="5" fill="#e05252" />
          <rect x="12" y="-14" width="10" height="5" fill="#e8e2d2" />
          <rect x="32" y="-14" width="10" height="5" fill="#e8e2d2" />
        </g>
      </g>

      {/* 道 */}
      <rect y="116" width="400" height="94" fill="#3a3f46" />
      <rect y="116" width="400" height="5" fill="#474d55" />
      <g fill="#5c636c">
        <rect className="itg-dash-a" x="20" y="196" width="46" height="6" rx="3" />
        <rect className="itg-dash-b" x="140" y="196" width="46" height="6" rx="3" />
        <rect className="itg-dash-c" x="260" y="196" width="46" height="6" rx="3" />
      </g>

      {/* 料金所の小屋 */}
      <g>
        <rect x="300" y="76" width="86" height="90" fill="#7d6a4e" />
        <rect x="294" y="66" width="98" height="14" rx="3" fill="#8f7b5c" />
        <g fill="#e05252">
          <rect x="294" y="60" width="16" height="8" />
          <rect x="326" y="60" width="16" height="8" />
          <rect x="358" y="60" width="16" height="8" />
        </g>
        <g fill="#e8e2d2">
          <rect x="310" y="60" width="16" height="8" />
          <rect x="342" y="60" width="16" height="8" />
          <rect x="374" y="60" width="16" height="8" />
        </g>
        <rect x="306" y="92" width="52" height="42" rx="3" fill="#22303a" />
        <rect x="306" y="92" width="52" height="8" fill="#3d4b56" />
        {/* 窓口の係と領収書つづり */}
        <circle cx="336" cy="112" r="13" fill="#c08a5c" />
        <path d="M323,110 a13,13 0 0 1 26,0 l0,-2 -26,0z" fill="#2a1f18" />
        <rect x="300" y="166" width="86" height="6" fill="#6b593f" />
        <g transform="translate(310,120)">
          <g className="itg-arm">
            <rect x="-16" y="-5" width="24" height="10" rx="5" fill="#c08a5c" />
          </g>
        </g>
      </g>

      {/* 遮断機 */}
      <g>
        <rect x="286" y="104" width="10" height="62" fill="#4a5560" />
        <rect x="280" y="160" width="22" height="8" rx="2" fill="#3d4650" />
        <g transform="translate(288,110)">
          <g className="itg-gate">
            <rect x="-124" y="-6" width="126" height="12" rx="3" fill="#e05252" />
            <rect x="-104" y="-6" width="22" height="12" fill="#e8e2d2" />
            <rect x="-62" y="-6" width="22" height="12" fill="#e8e2d2" />
            <rect x="-20" y="-6" width="22" height="12" fill="#e8e2d2" />
            <circle cx="-124" cy="0" r="6" fill="#f5b31c" />
          </g>
        </g>
      </g>

      {/* 足止めされた小型トラック */}
      <g transform="translate(140,152)">
        <g className="itg-truck">
          <rect x="-84" y="-56" width="86" height="46" rx="4" fill="#8a6a3a" />
          <rect x="-84" y="-56" width="86" height="8" fill="#a07c46" />
          <g fill="#6e5229">
            <rect x="-76" y="-44" width="70" height="4" />
            <rect x="-76" y="-32" width="70" height="4" />
            <rect x="-76" y="-20" width="70" height="4" />
          </g>
          <path d="M-2,-46 L34,-46 L46,-24 L46,-10 L-2,-10z" fill="#3f6b8a" />
          <path d="M4,-40 L30,-40 L39,-24 L4,-24z" fill="#a8cfe4" />
          <rect x="-84" y="-12" width="130" height="6" fill="#2c3540" />
          <circle cx="-58" cy="-2" r="11" fill="#1a222c" />
          <circle cx="-58" cy="-2" r="4" fill="#39424f" />
          <circle cx="26" cy="-2" r="11" fill="#1a222c" />
          <circle cx="26" cy="-2" r="4" fill="#39424f" />
          <circle cx="46" cy="-16" r="4" fill="#f5e2a8" />
        </g>
      </g>

      {/* 窓口へ飛んでいく硬貨 */}
      <g transform="translate(300,124)">
        <g className="itg-coin-a">
          <circle r="8" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(300,124)">
        <g className="itg-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(300,124)">
        <g className="itg-coin-c">
          <circle r="6" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      {/* たまっていく領収書 */}
      <g transform="translate(214,146)">
        <g className="itg-slip-a">
          <rect x="-11" y="-15" width="22" height="30" rx="2" fill="#efe7d6" />
          <g fill="#9aa0a8">
            <rect x="-7" y="-10" width="14" height="2.5" />
            <rect x="-7" y="-5" width="10" height="2.5" />
            <rect x="-7" y="0" width="13" height="2.5" />
          </g>
        </g>
      </g>
      <g transform="translate(248,168)">
        <g className="itg-slip-b">
          <rect x="-10" y="-13" width="20" height="26" rx="2" fill="#e6dcc9" />
          <g fill="#9aa0a8">
            <rect x="-6" y="-8" width="12" height="2.5" />
            <rect x="-6" y="-3" width="9" height="2.5" />
          </g>
        </g>
      </g>
      <g fill="#efe7d6">
        <rect x="176" y="188" width="20" height="14" rx="2" transform="rotate(-14 186 195)" />
        <rect x="204" y="192" width="18" height="12" rx="2" transform="rotate(9 213 198)" />
        <rect x="150" y="194" width="17" height="12" rx="2" transform="rotate(22 158 200)" />
      </g>

      <style>{`
        .itg-gate {
          transform-box: fill-box;
          transform-origin: right center;
          animation: itg-lift 4.4s ease-in-out infinite;
        }
        .itg-arm {
          transform-box: fill-box;
          transform-origin: right center;
          animation: itg-hold-out 4.4s ease-in-out infinite;
        }
        .itg-truck {
          transform-box: fill-box;
          transform-origin: center;
          animation: itg-creep 4.4s ease-in-out infinite;
        }
        .itg-next-a {
          transform-box: fill-box;
          transform-origin: left center;
          animation: itg-approach 4.4s linear infinite;
        }
        .itg-next-b {
          transform-box: fill-box;
          transform-origin: left center;
          animation: itg-approach 4.4s linear infinite;
          animation-delay: -2.2s;
        }
        .itg-dash-a { transform-box: fill-box; transform-origin: center; animation: itg-roll 4.4s ease-in-out infinite; }
        .itg-dash-b { transform-box: fill-box; transform-origin: center; animation: itg-roll 4.4s ease-in-out infinite; animation-delay: -1.4s; }
        .itg-dash-c { transform-box: fill-box; transform-origin: center; animation: itg-roll 4.4s ease-in-out infinite; animation-delay: -2.8s; }
        .itg-coin-a { transform-box: fill-box; transform-origin: center; animation: itg-pay 4.4s ease-in infinite; }
        .itg-coin-b { transform-box: fill-box; transform-origin: center; animation: itg-pay 4.4s ease-in infinite; animation-delay: -0.5s; }
        .itg-coin-c { transform-box: fill-box; transform-origin: center; animation: itg-pay 4.4s ease-in infinite; animation-delay: -1s; }
        .itg-slip-a { transform-box: fill-box; transform-origin: center; animation: itg-flutter 4.4s ease-in infinite; }
        .itg-slip-b { transform-box: fill-box; transform-origin: center; animation: itg-flutter 4.4s ease-in infinite; animation-delay: -2.1s; }
        @keyframes itg-lift {
          0%, 44% { transform: rotate(0deg); }
          62%, 84% { transform: rotate(-62deg); }
          98%, 100% { transform: rotate(0deg); }
        }
        @keyframes itg-hold-out {
          0%, 10% { transform: translate(0, 0); }
          30%, 52% { transform: translate(-22px, 0); }
          74%, 100% { transform: translate(0, 0); }
        }
        @keyframes itg-creep {
          0%, 58% { transform: translate(0, 0); }
          78% { transform: translate(26px, 0); }
          82% { transform: translate(-30px, 0); }
          100% { transform: translate(0, 0); }
        }
        @keyframes itg-approach {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          18% { opacity: 0.85; }
          88% { opacity: 0.85; }
          100% { transform: translate(-92px, 34px) scale(1.5); opacity: 0; }
        }
        @keyframes itg-roll {
          0%, 58% { transform: translate(0, 0); }
          78%, 100% { transform: translate(-44px, 0); }
        }
        @keyframes itg-pay {
          0%, 12% { transform: translate(-98px, -6px) scale(0.9); opacity: 0; }
          20% { opacity: 1; }
          46% { transform: translate(-40px, -26px) scale(1); }
          64% { transform: translate(6px, -8px) scale(0.85); opacity: 1; }
          72%, 100% { transform: translate(10px, -4px) scale(0.7); opacity: 0; }
        }
        @keyframes itg-flutter {
          0%, 20% { transform: translate(88px, -26px) rotate(0deg); opacity: 0; }
          30% { opacity: 1; }
          70% { transform: translate(24px, 10px) rotate(-160deg); opacity: 1; }
          92%, 100% { transform: translate(0, 44px) rotate(-330deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .itg-gate, .itg-arm, .itg-truck, .itg-next-a, .itg-next-b,
          .itg-dash-a, .itg-dash-b, .itg-dash-c,
          .itg-coin-a, .itg-coin-b, .itg-coin-c,
          .itg-slip-a, .itg-slip-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
