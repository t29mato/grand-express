/**
 * 干潟に出る。海はずっと遠くまで退き、村じゅうが熊手とバケツを持って追いかける。
 *
 * 濡れた砂に空が映り、腰を折った人が並ぶ。掻き出された貝は
 * バケツに溜まっていき、その一部はその晩のうちに売れる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function PecheAPied() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 引き潮の日の空 */}
      <rect width="400" height="210" fill="#a8cfe4" />
      <rect width="400" height="42" fill="#bcdcee" />
      <circle cx="330" cy="34" r="18" fill="#f5e6a8" />

      {/* 遠くに退いた海 */}
      <rect y="72" width="400" height="18" fill="#4d86a8" />
      <rect y="72" width="400" height="5" fill="#5f9cbc" />
      {/* 岬 */}
      <path d="M0,72 q40,-16 84,-8 l0,10 -84,0z" fill="#5c7a4a" />

      {/* 濡れた砂 */}
      <rect y="90" width="400" height="120" fill="#c4b394" />
      <rect y="90" width="400" height="8" fill="#d2c2a4" />
      <g fill="#b5a586">
        <path d="M0,118 q60,-8 120,2 q64,10 130,-2 q70,-12 150,0 l0,8 -400,0z" />
        <path d="M0,150 q70,10 148,0 q76,-10 152,4 l100,0 0,8 -400,0z" />
      </g>
      {/* 潮だまりに映る空 */}
      <g fill="#a8cfe4" opacity="0.6">
        <ellipse className="ppd-pool-a" cx="76" cy="136" rx="42" ry="7" />
        <ellipse className="ppd-pool-b" cx="300" cy="164" rx="52" ry="8" />
        <ellipse className="ppd-pool-c" cx="196" cy="112" rx="34" ry="5" />
      </g>

      {/* 砂に残された小舟 */}
      <g transform="translate(60,104)">
        <g className="ppd-boat">
          <path d="M-32,-6 l64,0 l-9,14 -46,0z" fill="#3f6b8a" />
          <rect x="-32" y="-9" width="64" height="4" rx="2" fill="#5288ab" />
          <rect x="6" y="-30" width="3" height="24" fill="#8d7d5c" />
        </g>
      </g>

      {/* 腰を折って掻く人たち */}
      <g transform="translate(140,148)">
        <g className="ppd-digger-a">
          <path d="M-16,0 q14,-30 32,-24 l-2,24z" fill="#c0362f" />
          <circle cx="18" cy="-30" r="10" fill="#f0e2cf" />
          <path d="M8,-34 a10,9 0 0 1 20,0 l0,3 -20,0z" fill="#3a2a1e" />
          <rect x="-30" y="-16" width="26" height="7" rx="3" fill="#c0362f" />
          <g className="ppd-rake-a">
            <rect x="-54" y="-14" width="34" height="5" rx="2" fill="#8d6b3c" />
            <rect x="-60" y="-16" width="8" height="14" rx="2" fill="#5f6875" />
          </g>
        </g>
      </g>
      <g transform="translate(268,178)">
        <g className="ppd-digger-b">
          <path d="M-18,0 q16,-34 36,-27 l-3,27z" fill="#3f6b8a" />
          <circle cx="21" cy="-34" r="11" fill="#f0e2cf" />
          <path d="M10,-38 a11,10 0 0 1 22,0 l0,3 -22,0z" fill="#5c4632" />
          <rect x="-34" y="-18" width="28" height="8" rx="4" fill="#3f6b8a" />
          <g className="ppd-rake-b">
            <rect x="-60" y="-16" width="34" height="5" rx="2" fill="#8d6b3c" />
            <rect x="-66" y="-18" width="8" height="15" rx="2" fill="#5f6875" />
          </g>
        </g>
      </g>
      <g transform="translate(348,126)">
        <g className="ppd-digger-c">
          <path d="M-12,0 q10,-22 24,-18 l-2,18z" fill="#4f7f42" />
          <circle cx="13" cy="-22" r="8" fill="#f0e2cf" />
          <rect x="-24" y="-12" width="20" height="6" rx="3" fill="#4f7f42" />
        </g>
      </g>

      {/* 貝の溜まったバケツ */}
      <g transform="translate(178,196)">
        <path d="M-26,-30 l52,0 l-6,30 -40,0z" fill="#5b8fe8" />
        <path d="M-27,-32 l54,0 l0,7 -54,0z" fill="#4a76c4" />
        <path d="M-24,-34 q24,-18 48,0" stroke="#3f5f9c" strokeWidth="4" fill="none" />
        <g fill="#c9bda4">
          <ellipse cx="-10" cy="-30" rx="11" ry="6" />
          <ellipse cx="8" cy="-33" rx="11" ry="6" />
          <ellipse cx="0" cy="-25" rx="10" ry="5" />
        </g>
        <g fill="#8d8272">
          <ellipse cx="-10" cy="-31" rx="6" ry="3" />
          <ellipse cx="8" cy="-34" rx="6" ry="3" />
        </g>
      </g>
      {/* 掻き出された貝 */}
      <g transform="translate(112,160)">
        <g className="ppd-shell">
          <ellipse rx="9" ry="5" fill="#d8ceb8" />
          <ellipse cy="-1" rx="5" ry="2.5" fill="#a89c86" />
        </g>
      </g>

      {/* 売れた分の硬貨 */}
      <g transform="translate(226,192)">
        <g className="ppd-coin">
          <circle r="9" fill="#f5b31c" />
          <circle r="4" fill="#c98f10" />
        </g>
      </g>

      <style>{`
        .ppd-boat { transform-box: fill-box; transform-origin: 50% 100%; animation: ppd-settle 5.4s ease-in-out infinite; }
        .ppd-digger-a { transform-box: fill-box; transform-origin: 50% 100%; animation: ppd-stoop 2.6s ease-in-out infinite; }
        .ppd-digger-b { transform-box: fill-box; transform-origin: 50% 100%; animation: ppd-stoop 3s ease-in-out infinite; animation-delay: -0.9s; }
        .ppd-digger-c { transform-box: fill-box; transform-origin: 50% 100%; animation: ppd-stoop 2.2s ease-in-out infinite; animation-delay: -1.4s; }
        .ppd-rake-a { transform-box: fill-box; transform-origin: right center; animation: ppd-scrape 2.6s ease-in-out infinite; }
        .ppd-rake-b { transform-box: fill-box; transform-origin: right center; animation: ppd-scrape 3s ease-in-out infinite; animation-delay: -0.9s; }
        .ppd-shell { transform-box: fill-box; transform-origin: center; opacity: 0; animation: ppd-toss 2.6s ease-out infinite; }
        .ppd-coin { transform-box: fill-box; transform-origin: center; animation: ppd-glint 3.4s ease-in-out infinite; }
        .ppd-pool-a { animation: ppd-shine 4.2s ease-in-out infinite; }
        .ppd-pool-b { animation: ppd-shine 5s ease-in-out infinite; animation-delay: -1.6s; }
        .ppd-pool-c { animation: ppd-shine 3.6s ease-in-out infinite; animation-delay: -2.4s; }
        @keyframes ppd-settle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(-4deg); }
        }
        @keyframes ppd-stoop {
          0%, 100% { transform: rotate(0deg) translate(0, 0); }
          50% { transform: rotate(-5deg) translate(0, 3px); }
        }
        @keyframes ppd-scrape {
          0%, 100% { transform: rotate(-4deg) translate(0, 0); }
          50% { transform: rotate(8deg) translate(6px, 2px); }
        }
        @keyframes ppd-toss {
          0%, 34% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          46% { transform: translate(14px, -20px) scale(1); opacity: 1; }
          78% { transform: translate(48px, 4px) scale(1); opacity: 1; }
          94%, 100% { transform: translate(64px, 30px) scale(0.9); opacity: 0; }
        }
        @keyframes ppd-glint {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.14); }
        }
        @keyframes ppd-shine {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.75; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ppd-boat, .ppd-digger-a, .ppd-digger-b, .ppd-digger-c,
          .ppd-rake-a, .ppd-rake-b, .ppd-shell, .ppd-coin,
          .ppd-pool-a, .ppd-pool-b, .ppd-pool-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
