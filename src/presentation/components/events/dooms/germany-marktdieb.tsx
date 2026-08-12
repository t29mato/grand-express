/**
 * クリスマス市ですりに遭う。ホットワインの屋台に群がる人混みの中、
 * 気づかれないまま上着のポケットから財布がそっと抜き取られる。
 *
 * 暴力は描かない。**そっと伸びる手と抜き取られる財布**だけで筋を見せる。
 * 動くのは、抜き取られる財布1つだけ(韓国の市場すりと同じ作り)。
 */
export function GermanyMarktdieb() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜のクリスマス市。 */}
      <rect width="400" height="210" fill="#1e2a3a" />
      <rect y="0" width="400" height="70" fill="#2a3a4e" />
      <g fill="#f4c430" opacity="0.8">
        <circle cx="40" cy="20" r="3" /><circle cx="90" cy="14" r="3" /><circle cx="140" cy="22" r="3" />
        <circle cx="260" cy="16" r="3" /><circle cx="310" cy="22" r="3" /><circle cx="360" cy="14" r="3" />
      </g>

      {/* 屋台の屋根の列。 */}
      <g strokeLinejoin="round">
        <path d="M0,70 L40,48 L80,70z" fill="#8a3a2a" />
        <path d="M90,70 L130,46 L170,70z" fill="#3a5a3a" />
        <path d="M280,70 L320,48 L360,70z" fill="#8a3a2a" />
        <path d="M360,70 L400,50 L400,70z" fill="#3a5a3a" />
      </g>
      <g fill="#3a2e20">
        <rect x="10" y="70" width="60" height="40" />
        <rect x="100" y="70" width="60" height="40" />
        <rect x="290" y="70" width="60" height="40" />
      </g>
      {/* 湯気の立つホットワインのカップ(屋台の商品)。 */}
      <g fill="#8a3a2a">
        <rect x="24" y="88" width="18" height="16" rx="2" />
        <rect x="114" y="88" width="18" height="16" rx="2" />
      </g>
      <g stroke="#e8dcc0" strokeWidth="1.6" fill="none" opacity="0.7">
        <path className="gmd-steam-a" d="M33,86c-3,-4 3,-6 0,-10" />
        <path className="gmd-steam-b" d="M123,86c-3,-4 3,-6 0,-10" />
      </g>

      {/* 通りの地面と人混みのシルエット(遠景)。 */}
      <rect y="110" width="400" height="100" fill="#151f2a" />
      <g fill="#101823" opacity="0.6">
        <ellipse cx="40" cy="180" rx="14" ry="26" />
        <ellipse cx="360" cy="176" rx="15" ry="28" />
      </g>

      {/* すり(すれ違いざまに肩をぶつける人)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M170,168 L162,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M182,168 L192,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M176,138 L176,172" stroke="#4a4a52" strokeWidth="22" fill="none" />
        <circle cx="176" cy="126" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M188,146 L206,152" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* ホットワインで両手がふさがった人。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M226,170 L232,198" stroke="#3d3a42" strokeWidth="9" fill="none" />
        <path d="M238,170 L230,198" stroke="#2f2c34" strokeWidth="9" fill="none" />
        <path d="M232,140 L232,174" stroke="#5b8fe8" strokeWidth="22" fill="none" />
        <circle cx="232" cy="128" r="11" fill="#d9a273" stroke="#241a10" strokeWidth="2" />
        <path d="M220,148 L204,144" stroke="#d9a273" strokeWidth="7" fill="none" />
        <rect x="196" y="138" width="12" height="12" rx="2" fill="#8a3a2a" />
      </g>

      {/* 抜き取られる財布。**ここだけが動く。** */}
      <g className="gmd-wallet">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#8a5a3a" stroke="#241a10" strokeWidth="1.5" />
        <rect x="-8" y="-6" width="16" height="4" fill="#a8763a" />
      </g>

      <style>{`
        .gmd-steam-a { animation: gmd-rise 2.4s ease-in-out infinite; }
        .gmd-steam-b { animation: gmd-rise 2.4s ease-in-out infinite; animation-delay: -1.2s; }
        .gmd-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: gmd-lift 2.4s ease-in-out infinite;
        }
        @keyframes gmd-rise {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-4px); }
        }
        @keyframes gmd-lift {
          0%, 15%  { transform: translate(214px, 156px) rotate(0deg); opacity: 1; }
          55%      { transform: translate(190px, 138px) rotate(-18deg); opacity: 1; }
          85%, 100% { transform: translate(172px, 130px) rotate(-24deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gmd-steam-a, .gmd-steam-b { animation: none; }
          .gmd-wallet {
            animation: none;
            transform: translate(180px, 134px) rotate(-20deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
