/**
 * 1月 — 初詣。
 *
 * 雪の残る境内。鳥居をくぐった行列が拝殿へ進み、賽銭が箱に飛び、
 * 参拝者が二拍手する。提灯が揺れ、雪がちらつく。
 */
export function Japan09() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の夜空 */}
      <rect width="400" height="210" fill="#1e2a44" />
      <g fill="#f6efe2">
        <circle className="j09-star j09-star-a" cx="52" cy="18" r="1.8" />
        <circle className="j09-star j09-star-b" cx="146" cy="10" r="1.4" />
        <circle className="j09-star j09-star-c" cx="196" cy="60" r="1.6" />
        <circle className="j09-star j09-star-d" cx="374" cy="24" r="1.8" />
      </g>

      {/* 境内の地面と残雪 */}
      <rect y="140" width="400" height="70" fill="#3b3a55" />
      <path d="M0,140 L112,140 L104,152 L0,154 Z" fill="#dfe8f2" />
      <path d="M330,140 L400,140 L400,156 L318,152 Z" fill="#dfe8f2" />
      <ellipse cx="176" cy="200" rx="72" ry="9" fill="#dfe8f2" opacity="0.5" />

      {/* 拝殿(雪をかぶった屋根と、灯りのともる戸口) */}
      <path d="M200,102 C230,74 268,52 306,48 C344,52 382,74 404,102 Z" fill="#e8f2f7" />
      <path d="M200,110 C230,84 268,63 306,59 C344,63 382,84 404,110 Z" fill="#38304a" />
      <rect x="232" y="106" width="150" height="36" fill="#6b4a33" />
      <rect x="238" y="112" width="16" height="30" fill="#4f3626" />
      <rect x="290" y="110" width="52" height="32" fill="#241f33" />
      <rect className="j09-glow" x="294" y="114" width="44" height="28" fill="#f5b31c" />
      <rect x="360" y="112" width="16" height="30" fill="#4f3626" />
      {/* 注連縄 */}
      <rect x="228" y="102" width="158" height="9" rx="4.5" fill="#d8cdb4" />
      <g fill="#f6efe2">
        <path d="M248,111 l11,0 l-4,7 l4,0 l-9,9 l3,-9 l-4,0 Z" />
        <path d="M290,111 l11,0 l-4,7 l4,0 l-9,9 l3,-9 l-4,0 Z" />
        <path d="M332,111 l11,0 l-4,7 l4,0 l-9,9 l3,-9 l-4,0 Z" />
      </g>

      {/* 鈴の緒と鈴 */}
      <g className="j09-bell">
        <rect x="259" y="110" width="10" height="28" fill="#d8cdb4" />
        <g fill="#b03c33">
          <rect x="259" y="115" width="10" height="3" />
          <rect x="259" y="123" width="10" height="3" />
          <rect x="259" y="131" width="10" height="3" />
        </g>
        <ellipse cx="264" cy="142" rx="11" ry="9" fill="#c9a877" />
        <rect x="258" y="145" width="13" height="3.5" rx="1.75" fill="#5a4326" />
      </g>

      {/* 鳥居 */}
      <g>
        <rect x="4" y="34" width="116" height="7" rx="3" fill="#dfe8f2" />
        <rect x="6" y="40" width="112" height="11" rx="3" fill="#d4453a" />
        <rect x="14" y="51" width="96" height="8" fill="#a8332b" />
        <rect x="18" y="74" width="88" height="9" fill="#d4453a" />
        <rect x="24" y="46" width="15" height="106" fill="#d4453a" />
        <rect x="85" y="46" width="15" height="106" fill="#d4453a" />
        <rect x="24" y="46" width="5" height="106" fill="#e8635a" />
        <rect x="85" y="46" width="5" height="106" fill="#e8635a" />
      </g>

      {/* 鳥居をくぐって拝殿へ進む行列 */}
      <g className="j09-queue">
        <g transform="translate(34,150)">
          <circle cx="0" cy="-30" r="6.5" fill="#f6efe2" />
          <path d="M-6.5,-32 a6.5,6.5 0 0 1 13,0 Z" fill="#2b2436" />
          <rect x="-7" y="-24" width="14" height="24" rx="5" fill="#3b5c96" />
        </g>
        <g transform="translate(60,150)">
          <circle cx="0" cy="-28" r="6" fill="#f0dfc4" />
          <path d="M-6,-30 a6,6 0 0 1 12,0 Z" fill="#2b2436" />
          <rect x="-6.5" y="-22" width="13" height="22" rx="5" fill="#8a3f5e" />
        </g>
        <g transform="translate(86,150)">
          <circle cx="0" cy="-31" r="6.5" fill="#f6efe2" />
          <path d="M-6.5,-33 a6.5,6.5 0 0 1 13,0 Z" fill="#3a2b22" />
          <rect x="-7" y="-25" width="14" height="25" rx="5" fill="#4f6f4a" />
        </g>
        <g transform="translate(112,150)">
          <circle cx="0" cy="-28" r="6" fill="#f0dfc4" />
          <path d="M-6,-30 a6,6 0 0 1 12,0 Z" fill="#2b2436" />
          <rect x="-6.5" y="-22" width="13" height="22" rx="5" fill="#c9713a" />
        </g>
      </g>

      {/* 賽銭箱 */}
      <path d="M204,156 L326,156 L336,144 L214,144 Z" fill="#8a6140" />
      <g fill="#3d2a1a">
        <path d="M228,156 L231,144 L237,144 L234,156 Z" />
        <path d="M252,156 L255,144 L261,144 L258,156 Z" />
        <path d="M276,156 L279,144 L285,144 L282,156 Z" />
        <path d="M300,156 L303,144 L309,144 L306,156 Z" />
      </g>
      <rect x="204" y="156" width="122" height="40" fill="#6b4a33" />
      <rect x="204" y="156" width="122" height="6" fill="#4f3626" />
      <rect x="212" y="168" width="106" height="20" rx="3" fill="#5a3d29" />
      <g fill="#c9a877">
        <rect x="208" y="160" width="6" height="34" />
        <rect x="316" y="160" width="6" height="34" />
      </g>

      {/* 二拍手する参拝者 */}
      <g transform="translate(158,198)">
        <ellipse cx="0" cy="2" rx="24" ry="6" fill="#2b2c44" />
        <rect x="-12" y="-24" width="9" height="25" rx="4" fill="#2b3550" />
        <rect x="3" y="-24" width="9" height="25" rx="4" fill="#2b3550" />
        <rect x="-16" y="-58" width="32" height="38" rx="7" fill="#3b5c96" />
        <rect x="-16" y="-46" width="32" height="6" fill="#2f4a7c" />
        <g className="j09-arm-l">
          <rect x="-19" y="-56" width="8" height="21" rx="4" fill="#3b5c96" />
          <circle cx="-15" cy="-34" r="5.5" fill="#f6efe2" />
        </g>
        <g className="j09-arm-r">
          <rect x="11" y="-56" width="8" height="21" rx="4" fill="#3b5c96" />
          <circle cx="15" cy="-34" r="5.5" fill="#f6efe2" />
        </g>
        <rect x="-14" y="-64" width="28" height="8" rx="4" fill="#f5b31c" />
        <circle cx="0" cy="-74" r="12" fill="#f6efe2" />
        <path d="M-12,-76 a12,12 0 0 1 24,0 L10,-70 L-10,-70 Z" fill="#2b2436" />
      </g>

      {/* 投げ込まれる賽銭 */}
      <g className="j09-coin j09-coin-a">
        <circle r="6" fill="#f5b31c" />
        <circle r="2.4" fill="#b8860b" />
      </g>
      <g className="j09-coin j09-coin-b">
        <circle r="5" fill="#e8c86a" />
        <circle r="2" fill="#b8860b" />
      </g>

      {/* 提灯 */}
      <path d="M0,22 Q200,40 400,22" stroke="#7a6a52" strokeWidth="3" fill="none" />
      <g transform="translate(150,30)">
        <g className="j09-lantern j09-lantern-a">
          <rect x="-1.5" y="0" width="3" height="6" fill="#7a6a52" />
          <rect x="-9" y="6" width="18" height="4" rx="1" fill="#a8332b" />
          <ellipse cx="0" cy="19" rx="11" ry="12" fill="#f5b31c" />
          <rect x="-11" y="17" width="22" height="4" fill="#d4453a" />
          <rect x="-9" y="28" width="18" height="4" rx="1" fill="#a8332b" />
        </g>
      </g>
      <g transform="translate(215,31)">
        <g className="j09-lantern j09-lantern-b">
          <rect x="-1.5" y="0" width="3" height="6" fill="#7a6a52" />
          <rect x="-9" y="6" width="18" height="4" rx="1" fill="#a8332b" />
          <ellipse cx="0" cy="19" rx="11" ry="12" fill="#f5b31c" />
          <rect x="-11" y="17" width="22" height="4" fill="#d4453a" />
          <rect x="-9" y="28" width="18" height="4" rx="1" fill="#a8332b" />
        </g>
      </g>
      <g transform="translate(280,30)">
        <g className="j09-lantern j09-lantern-c">
          <rect x="-1.5" y="0" width="3" height="6" fill="#7a6a52" />
          <rect x="-9" y="6" width="18" height="4" rx="1" fill="#a8332b" />
          <ellipse cx="0" cy="19" rx="11" ry="12" fill="#f5b31c" />
          <rect x="-11" y="17" width="22" height="4" fill="#d4453a" />
          <rect x="-9" y="28" width="18" height="4" rx="1" fill="#a8332b" />
        </g>
      </g>
      <g transform="translate(345,26)">
        <g className="j09-lantern j09-lantern-d">
          <rect x="-1.5" y="0" width="3" height="6" fill="#7a6a52" />
          <rect x="-9" y="6" width="18" height="4" rx="1" fill="#a8332b" />
          <ellipse cx="0" cy="19" rx="11" ry="12" fill="#f5b31c" />
          <rect x="-11" y="17" width="22" height="4" fill="#d4453a" />
          <rect x="-9" y="28" width="18" height="4" rx="1" fill="#a8332b" />
        </g>
      </g>

      {/* ちらつく雪 */}
      <g fill="#f6efe2">
        <circle className="j09-snow j09-snow-a" cx="60" cy="70" r="2.4" />
        <circle className="j09-snow j09-snow-b" cx="180" cy="96" r="1.8" />
        <circle className="j09-snow j09-snow-c" cx="300" cy="60" r="2.2" />
        <circle className="j09-snow j09-snow-d" cx="370" cy="110" r="1.8" />
        <circle className="j09-snow j09-snow-e" cx="120" cy="120" r="2" />
      </g>

      <style>{`
        .j09-glow { animation: j09-lamp 3.2s ease-in-out infinite; }
        .j09-bell { transform-box: fill-box; transform-origin: 50% 0; animation: j09-shake 2.6s ease-in-out infinite; }
        .j09-queue { transform-box: fill-box; transform-origin: 50% 100%; animation: j09-shuffle 3.4s ease-in-out infinite; }
        .j09-arm-l { transform-box: fill-box; transform-origin: 50% 0; transform: rotate(-30deg); animation: j09-clap-l 2.2s ease-in-out infinite; }
        .j09-arm-r { transform-box: fill-box; transform-origin: 50% 0; transform: rotate(30deg); animation: j09-clap-r 2.2s ease-in-out infinite; }
        .j09-coin { transform-box: fill-box; transform-origin: 50% 50%; }
        .j09-coin-a { transform: translate(214px, 122px); animation: j09-toss 2.2s ease-in infinite; }
        .j09-coin-b { transform: translate(244px, 130px); animation: j09-toss 2.2s ease-in infinite; animation-delay: -1.1s; }
        .j09-lantern { transform-box: fill-box; transform-origin: 50% 0; }
        .j09-lantern-a { animation: j09-sway 3.6s ease-in-out infinite; }
        .j09-lantern-b { animation: j09-sway 3.6s ease-in-out infinite; animation-delay: -0.9s; }
        .j09-lantern-c { animation: j09-sway 3.6s ease-in-out infinite; animation-delay: -1.8s; }
        .j09-lantern-d { animation: j09-sway 3.6s ease-in-out infinite; animation-delay: -2.7s; }
        .j09-snow-a { animation: j09-fall-a 9s linear infinite; }
        .j09-snow-b { animation: j09-fall-b 7s linear -3s infinite; }
        .j09-snow-c { animation: j09-fall-c 11s linear -5s infinite; }
        .j09-snow-d { animation: j09-fall-d 8s linear -2s infinite; }
        .j09-snow-e { animation: j09-fall-e 10s linear -6s infinite; }
        .j09-star-a { animation: j09-twinkle 3s ease-in-out infinite; }
        .j09-star-b { animation: j09-twinkle 3s ease-in-out -0.8s infinite; }
        .j09-star-c { animation: j09-twinkle 3s ease-in-out -1.6s infinite; }
        .j09-star-d { animation: j09-twinkle 3s ease-in-out -2.3s infinite; }
        @keyframes j09-lamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes j09-shake {
          0%, 44%, 100% { transform: rotate(0deg); }
          12% { transform: rotate(5deg); }
          24% { transform: rotate(-5deg); }
          34% { transform: rotate(2.5deg); }
        }
        @keyframes j09-shuffle {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(9px); }
        }
        @keyframes j09-clap-l {
          0%, 55%, 100% { transform: rotate(-30deg); }
          14%, 40% { transform: rotate(-6deg); }
          27% { transform: rotate(-30deg); }
        }
        @keyframes j09-clap-r {
          0%, 55%, 100% { transform: rotate(30deg); }
          14%, 40% { transform: rotate(6deg); }
          27% { transform: rotate(30deg); }
        }
        @keyframes j09-toss {
          0% { transform: translate(172px, 152px) scale(0.8); opacity: 0; }
          12% { transform: translate(182px, 142px) scale(1); opacity: 1; }
          52% { transform: translate(224px, 116px) scale(1); opacity: 1; }
          88% { transform: translate(268px, 146px) scale(1); opacity: 1; }
          100% { transform: translate(272px, 156px) scale(0.8); opacity: 0; }
        }
        @keyframes j09-sway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes j09-fall-a {
          from { transform: translate(0px, -80px); }
          to { transform: translate(-26px, 150px); }
        }
        @keyframes j09-fall-b {
          from { transform: translate(0px, -110px); }
          to { transform: translate(22px, 118px); }
        }
        @keyframes j09-fall-c {
          from { transform: translate(0px, -70px); }
          to { transform: translate(-30px, 158px); }
        }
        @keyframes j09-fall-d {
          from { transform: translate(0px, -124px); }
          to { transform: translate(18px, 104px); }
        }
        @keyframes j09-fall-e {
          from { transform: translate(0px, -134px); }
          to { transform: translate(-20px, 92px); }
        }
        @keyframes j09-twinkle {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .j09-glow, .j09-bell, .j09-queue, .j09-arm-l, .j09-arm-r,
          .j09-coin-a, .j09-coin-b,
          .j09-lantern-a, .j09-lantern-b, .j09-lantern-c, .j09-lantern-d,
          .j09-snow-a, .j09-snow-b, .j09-snow-c, .j09-snow-d, .j09-snow-e,
          .j09-star-a, .j09-star-b, .j09-star-c, .j09-star-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
