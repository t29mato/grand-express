/**
 * 駅の通路の、床にしるしのある一角で二時間弾く(増)。
 *
 *   - タイル張りの通路。足元には許可された場所を示す四角が描いてある
 *   - 弓が上下し、開いたケースに硬貨が落ちていく
 *   - 後ろを通行人が絶え間なく流れていく
 */
export function LicensedPitch() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* タイル張りの通路 */}
      <rect width="400" height="210" fill="#cfd8dd" />
      <rect width="400" height="132" fill="#e2e8ea" />
      <g stroke="#c6d0d4" strokeWidth="2">
        <path d="M0,26 L400,26 M0,52 L400,52 M0,78 L400,78 M0,104 L400,104" />
        <path d="M40,0 L40,132 M100,0 L100,132 M160,0 L160,132 M220,0 L220,132 M280,0 L280,132 M340,0 L340,132" />
      </g>
      <rect y="126" width="400" height="10" fill="#a8b4bc" />
      <rect y="136" width="400" height="74" fill="#8f9aa8" />
      <g stroke="#7f8a99" strokeWidth="2">
        <path d="M0,158 L400,158 M0,182 L400,182" />
      </g>

      {/* 通路の灯り */}
      <g fill="#f5e2a8" opacity="0.9">
        <rect x="52" y="8" width="52" height="8" rx="4" />
        <rect x="296" y="8" width="52" height="8" rx="4" />
      </g>

      {/* 通り過ぎる人影 */}
      <g fill="#7a8592" opacity="0.75">
        <g className="lcp-passer">
          <circle cx="60" cy="86" r="11" />
          <path d="M46,132 L46,104 Q60,93 74,104 L74,132z" />
        </g>
        <g className="lcp-passer lcp-p2">
          <circle cx="200" cy="90" r="10" />
          <path d="M188,132 L188,108 Q200,98 212,108 L212,132z" />
        </g>
        <g className="lcp-passer lcp-p3">
          <circle cx="320" cy="84" r="11" />
          <path d="M306,132 L306,102 Q320,91 334,102 L334,132z" />
        </g>
      </g>

      {/* 床のしるし */}
      <rect x="118" y="150" width="128" height="44" rx="3" fill="none" stroke="#f5b31c" strokeWidth="4" />
      <rect x="118" y="150" width="128" height="44" fill="#f5b31c" opacity="0.12" />

      {/* 弾き手 */}
      <g transform="translate(158,192)">
        <rect x="-13" y="-22" width="10" height="22" fill="#3b4a63" />
        <rect x="3" y="-22" width="10" height="22" fill="#3b4a63" />
        <rect x="-17" y="-62" width="34" height="42" rx="10" fill="#5b8fe8" />
        <circle cx="0" cy="-72" r="13" fill="#f6efe2" />
        <path d="M-13,-76 a13,13 0 0 1 26,0z" fill="#3b2f2a" />
        {/* 顎に挟んだ楽器。胴は左へ、棹はさらに左へ伸びる */}
        <g transform="rotate(-8)">
          <ellipse cx="-28" cy="-58" rx="14" ry="10" fill="#8a4a24" />
          <ellipse cx="-44" cy="-58" rx="10" ry="7.5" fill="#8a4a24" />
          <rect x="-64" y="-60.5" width="22" height="5" rx="2" fill="#5a3220" />
          <path d="M-66,-64 q-5,3 0,7z" fill="#5a3220" />
          <rect x="-18" y="-63" width="8" height="9" rx="2" fill="#3f2c19" />
          <g stroke="#e8dfc8" strokeWidth="1.2">
            <path d="M-58,-59 L-18,-58" />
          </g>
        </g>
        {/* 弓 */}
        <g className="lcp-bow">
          <path d="M-52,-44 L-14,-70" stroke="#e8dfc8" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M-52,-41 L-14,-67" stroke="#8a6a3c" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="lcp-arm">
          <rect x="-20" y="-72" width="9" height="26" rx="4.5" fill="#f6efe2" />
        </g>
      </g>

      {/* 開いたケースと落ちる硬貨 */}
      <g transform="translate(288,190)">
        <path d="M-42,0 L42,0 L36,-20 L-36,-20z" fill="#5a3d22" />
        <path d="M-36,-20 L36,-20 L32,-30 L-32,-30z" fill="#7a5a34" />
        <path d="M-42,-2 L42,-2 L42,2 L-42,2z" fill="#3f2c19" />
      </g>
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="lcp-coin-a" cx="272" cy="140" r="8" />
        <circle className="lcp-coin-b" cx="296" cy="132" r="7" />
        <circle className="lcp-coin-c" cx="308" cy="146" r="6" />
      </g>
      <g fill="#e8a11c">
        <circle cx="268" cy="176" r="6" />
        <circle cx="284" cy="178" r="5" />
        <circle cx="300" cy="175" r="6" />
      </g>

      {/* 音符の代わりの、広がる音の輪 */}
      <g fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path className="lcp-ring" d="M92,116 a18,18 0 0 0 0,-32" />
        <path className="lcp-ring lcp-r2" d="M82,124 a26,26 0 0 0 0,-48" />
      </g>

      <style>{`
        .lcp-bow {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: lcp-draw 1.4s ease-in-out infinite;
        }
        .lcp-arm {
          transform-box: fill-box; transform-origin: 100% 0;
          animation: lcp-saw 1.4s ease-in-out infinite;
        }
        .lcp-passer {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: lcp-walk 7s linear infinite;
        }
        .lcp-p2 { animation-delay: -2.4s; animation-duration: 8.4s; }
        .lcp-p3 { animation-delay: -4.8s; animation-duration: 6.4s; }
        .lcp-ring { animation: lcp-sound 2.2s ease-out infinite; }
        .lcp-r2 { animation-delay: -1.1s; }
        .lcp-coin-a { animation: lcp-toss 2.8s ease-in infinite; }
        .lcp-coin-b { animation: lcp-toss 2.8s ease-in infinite; animation-delay: -0.9s; }
        .lcp-coin-c { animation: lcp-toss 2.8s ease-in infinite; animation-delay: -1.9s; }
        @keyframes lcp-draw {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-14px, 6px) rotate(6deg); }
        }
        @keyframes lcp-saw {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg); }
        }
        @keyframes lcp-walk {
          0% { transform: translateX(320px); }
          100% { transform: translateX(-380px); }
        }
        @keyframes lcp-sound {
          0% { opacity: 0.9; }
          100% { opacity: 0; transform: translateX(10px); }
        }
        @keyframes lcp-toss {
          0% { transform: translate(0, -46px); opacity: 0; }
          20% { opacity: 1; }
          78% { transform: translate(4px, 30px); opacity: 1; }
          88%, 100% { transform: translate(4px, 36px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lcp-bow, .lcp-arm, .lcp-passer, .lcp-ring,
          .lcp-coin-a, .lcp-coin-b, .lcp-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
