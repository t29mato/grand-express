/**
 * ブラマプトラが増水し、渡し船が桟橋に着けられない。
 *
 * 桟橋は水に沈んで杭の頭だけが出ている。船は寄せては流されを繰り返し、
 * 岸に取り残された旅人の硬貨が濁流に落ち、遠回りの経路だけが残る。
 */
export function FloodFerry() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 低い雲と、遠すぎる対岸 */}
      <rect width="400" height="210" fill="#152436" />
      <rect width="400" height="95" fill="#2f4860" />
      <g fill="#22384a">
        <ellipse className="ff-cloud-a" cx="90" cy="26" rx="66" ry="18" />
        <ellipse className="ff-cloud-b" cx="268" cy="20" rx="78" ry="20" />
        <ellipse className="ff-cloud-c" cx="360" cy="42" rx="54" ry="15" />
      </g>
      <rect y="88" width="400" height="8" fill="#2c4a36" />

      {/* 濁って広がった川 */}
      <rect y="95" width="400" height="115" fill="#6f5a38" />
      <g fill="#8a7248" opacity="0.6">
        <rect className="ff-cur-a" x="30" y="110" width="96" height="4" rx="2" />
        <rect className="ff-cur-b" x="220" y="122" width="120" height="4" rx="2" />
        <rect className="ff-cur-c" x="140" y="166" width="110" height="5" rx="2.5" />
        <rect className="ff-cur-d" x="286" y="192" width="130" height="5" rx="2.5" />
        <rect className="ff-cur-e" x="60" y="202" width="90" height="5" rx="2.5" />
      </g>

      {/* 水没した桟橋(杭の頭だけが出ている) */}
      <g fill="#5a4028">
        <rect x="70" y="124" width="8" height="56" />
        <rect x="98" y="128" width="8" height="52" />
        <rect x="126" y="124" width="8" height="56" />
        <rect x="154" y="130" width="8" height="50" />
      </g>
      <rect x="62" y="152" width="108" height="8" fill="#6a4a2c" />

      {/* 上がりきった水面 */}
      <rect className="ff-surface" y="146" width="400" height="64" fill="#6f5a38" opacity="0.72" />
      <g fill="#a08a5c" opacity="0.5">
        <rect x="0" y="145" width="150" height="3" rx="1.5" />
        <rect x="190" y="145" width="210" height="3" rx="1.5" />
      </g>

      {/* 着けられない渡し船 */}
      <g className="ff-ferry">
        <ellipse cx="0" cy="20" rx="62" ry="7" fill="#8a7248" opacity="0.55" />
        <path d="M-52,0 Q-56,16 -30,20 L30,20 Q56,16 52,0z" fill="#3f5a6a" />
        <rect x="-50" y="1" width="100" height="5" fill="#e8443f" />
        <rect x="-30" y="-26" width="60" height="26" rx="3" fill="#cfd8dc" />
        <g fill="#2c4256">
          <rect x="-24" y="-20" width="11" height="10" rx="2" />
          <rect x="-7" y="-20" width="11" height="10" rx="2" />
          <rect x="10" y="-20" width="11" height="10" rx="2" />
        </g>
        <rect x="-15" y="-41" width="31" height="16" rx="3" fill="#cfd8dc" />
        <rect x="-9" y="-37" width="19" height="8" rx="2" fill="#2c4256" />
        <rect x="20" y="-44" width="10" height="20" rx="2" fill="#e8443f" />
      </g>
      <g transform="translate(297,82)" fill="#8fa0a8">
        <circle className="ff-smoke-a" r="7" />
        <circle className="ff-smoke-b" r="6" />
        <circle className="ff-smoke-c" r="5" />
      </g>

      {/* 取り残された岸と旅人 */}
      <path d="M0,164 L54,174 L60,210 L0,210z" fill="#3c3020" />
      <g transform="translate(26,169)">
        <rect x="-9" y="-14" width="8" height="14" rx="2" fill="#3b2f4a" />
        <rect x="1" y="-14" width="8" height="14" rx="2" fill="#3b2f4a" />
        <rect x="-11" y="-38" width="22" height="26" rx="7" fill="#5b8fe8" />
        <rect x="10" y="-30" width="12" height="16" rx="3" fill="#8a6a44" />
        <rect className="ff-hail" x="-14" y="-40" width="7" height="26" rx="3.5" fill="#f6efe2" />
        <circle cx="0" cy="-47" r="10" fill="#f6efe2" />
      </g>

      {/* 濁流に落ちる渡し賃 */}
      <g transform="translate(62,132)" fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="ff-coin-a" r="8" />
        <circle className="ff-coin-b" r="7" />
        <circle className="ff-coin-c" r="6" />
      </g>

      {/* 残された遠回りの道 */}
      <path
        className="ff-detour"
        d="M52,182 C130,204 246,196 316,172 C354,158 366,136 350,114"
        fill="none"
        stroke="#f5e2a8"
        strokeWidth="3"
        strokeDasharray="11 9"
        opacity="0.85"
      />
      <polygon points="346,106 360,113 349,121" fill="#f5e2a8" opacity="0.85" />

      <style>{`
        .ff-ferry {
          transform: translate(272px, 126px) rotate(-1.5deg);
          animation: ff-approach 5.4s ease-in-out infinite;
        }
        .ff-surface { animation: ff-swell 3.6s ease-in-out infinite; }
        .ff-hail { transform-origin: -10px -36px; animation: ff-wave 1.6s ease-in-out infinite; }
        .ff-detour { animation: ff-march 1.4s linear infinite; }
        .ff-cloud-a { animation: ff-scud 22s linear infinite; }
        .ff-cloud-b { animation: ff-scud 28s linear infinite; animation-delay: -9s; }
        .ff-cloud-c { animation: ff-scud 25s linear infinite; animation-delay: -16s; }
        .ff-cur-a { animation: ff-run 4.4s linear infinite; }
        .ff-cur-b { animation: ff-run 5.2s linear infinite; animation-delay: -1.6s; }
        .ff-cur-c { animation: ff-run 3.8s linear infinite; animation-delay: -2.4s; }
        .ff-cur-d { animation: ff-run 4.8s linear infinite; animation-delay: -3.1s; }
        .ff-cur-e { animation: ff-run 4.1s linear infinite; animation-delay: -0.8s; }
        .ff-smoke-a { animation: ff-puff 2.6s ease-out infinite; }
        .ff-smoke-b { animation: ff-puff 2.6s ease-out infinite; animation-delay: -0.9s; }
        .ff-smoke-c { animation: ff-puff 2.6s ease-out infinite; animation-delay: -1.8s; }
        .ff-coin-a { transform: translate(0, 2px); animation: ff-drop 2.9s ease-in infinite; }
        .ff-coin-b {
          transform: translate(12px, 26px);
          animation: ff-drop 2.9s ease-in infinite;
          animation-delay: -1s;
        }
        .ff-coin-c {
          transform: translate(24px, 50px);
          animation: ff-drop 2.9s ease-in infinite;
          animation-delay: -2s;
        }
        @keyframes ff-approach {
          0%, 100% { transform: translate(288px, 126px) rotate(-1.5deg); }
          38% { transform: translate(246px, 128px) rotate(1.5deg); }
          52% { transform: translate(252px, 125px) rotate(-1deg); }
        }
        @keyframes ff-swell {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes ff-wave {
          0%, 100% { transform: rotate(-14deg); }
          50% { transform: rotate(-42deg); }
        }
        @keyframes ff-march {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        @keyframes ff-scud {
          0% { transform: translate(-120px, 0); }
          100% { transform: translate(480px, 0); }
        }
        @keyframes ff-run {
          0% { transform: translate(140px, 0); opacity: 0; }
          22%, 74% { opacity: 0.7; }
          100% { transform: translate(-190px, 0); opacity: 0; }
        }
        @keyframes ff-puff {
          0% { transform: translate(0, 4px) scale(0.4); opacity: 0.75; }
          100% { transform: translate(-26px, -46px) scale(1.5); opacity: 0; }
        }
        @keyframes ff-drop {
          0% { transform: translate(-6px, -18px); opacity: 0; }
          16% { transform: translate(0, 2px); opacity: 1; }
          60% { transform: translate(16px, 34px); opacity: 1; }
          100% { transform: translate(32px, 74px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ff-ferry, .ff-surface, .ff-hail, .ff-detour,
          .ff-cloud-a, .ff-cloud-b, .ff-cloud-c,
          .ff-cur-a, .ff-cur-b, .ff-cur-c, .ff-cur-d, .ff-cur-e,
          .ff-smoke-a, .ff-smoke-b, .ff-smoke-c,
          .ff-coin-a, .ff-coin-b, .ff-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
