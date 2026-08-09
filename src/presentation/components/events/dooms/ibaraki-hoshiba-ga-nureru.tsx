/**
 * 干し場が濡れる。薄切りは野天に出してあった。
 * 生ぬるく湿った一夜が、そのすべてを持っていった。
 *
 * 干し芋は全国の九割がこの土地で作られ、**からっ風で干す**。
 * だから屋内で作る方法がなく、一週間の悪天がその年になる。
 *
 * **動くものは1つだけ**——簾の上に落ちる雨だれ。
 * 干し芋の色が濡れて沈んでいることと、間に合わなかった筵で「手遅れ」を伝える。
 */
export function IbarakiHoshibaGaNureru() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 生ぬるく湿った夜。 */}
      <rect width="400" height="210" fill="#3d4450" />
      <g fill="#333a45">
        <ellipse cx="80" cy="26" rx="72" ry="24" />
        <ellipse cx="220" cy="18" rx="84" ry="26" />
        <ellipse cx="350" cy="28" rx="68" ry="22" />
      </g>
      <rect y="132" width="400" height="78" fill="#4a4a3e" />
      <rect y="132" width="400" height="4" fill="#5a5a4a" />

      {/* 干し場の簾。濡れて色が沈んでいる。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="40" y="118" width="140" height="10" rx="2" fill="#6b5a3c" />
        <rect x="46" y="128" width="8" height="30" fill="#5a4a30" />
        <rect x="166" y="128" width="8" height="30" fill="#5a4a30" />
        <rect x="216" y="124" width="146" height="10" rx="2" fill="#6b5a3c" />
        <rect x="222" y="134" width="8" height="30" fill="#5a4a30" />
        <rect x="346" y="134" width="8" height="30" fill="#5a4a30" />
      </g>
      {/* 並べた薄切り。濡れて艶が出て、干し芋の飴色になっていない。 */}
      <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
        <rect x="48" y="104" width="24" height="14" rx="4" fill="#a8763c" />
        <rect x="76" y="104" width="24" height="14" rx="4" fill="#96682f" />
        <rect x="104" y="104" width="24" height="14" rx="4" fill="#a8763c" />
        <rect x="132" y="104" width="24" height="14" rx="4" fill="#8a5f2c" />
        <rect x="224" y="110" width="24" height="14" rx="4" fill="#96682f" />
        <rect x="252" y="110" width="24" height="14" rx="4" fill="#a8763c" />
        <rect x="280" y="110" width="24" height="14" rx="4" fill="#8a5f2c" />
        <rect x="308" y="110" width="24" height="14" rx="4" fill="#96682f" />
      </g>

      {/* 間に合わなかった筵。半分しか掛かっていない。 */}
      <path d="M300,100 L372,96 L378,124 L306,128z" fill="#8a8258" stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round" />

      {/* 夜中に出てきた人。筵の端を持っているが、もう遅い。 */}
      <g stroke="#241f18" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="200" cy="196" rx="26" ry="5" fill="#3f3f34" stroke="none" />
        <rect x="188" y="166" width="11" height="30" rx="5" fill="#2f3b4f" />
        <rect x="202" y="166" width="11" height="30" rx="5" fill="#2f3b4f" />
        <rect x="184" y="126" width="32" height="42" rx="10" fill="#e05252" />
        <circle cx="200" cy="114" r="13" fill="#d9a273" />
        <path d="M187,112 a13,13 0 0 1 26,0z" fill="#241c1a" />
        <g transform="translate(214,134) rotate(-40)">
          <rect x="0" y="-6" width="46" height="12" rx="6" fill="#d9a273" />
        </g>
        <circle cx="250" cy="106" r="7" fill="#d9a273" />
      </g>

      {/* 落ちる雨だれ。**ここだけが動く。** */}
      <g className="ihgn-drip" stroke="#a8c4d8" strokeWidth="3" strokeLinecap="round">
        <path d="M92,42 L92,58" />
        <path d="M148,30 L148,48" />
        <path d="M262,36 L262,54" />
        <path d="M330,26 L330,44" />
        <path d="M198,46 L198,62" />
      </g>

      <style>{`
        .ihgn-drip {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: ihgn-fall 1.5s linear infinite;
        }
        @keyframes ihgn-fall {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.9; }
          100% { transform: translateY(76px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ihgn-drip { animation: none; }
        }
      `}</style>
    </svg>
  );
}
