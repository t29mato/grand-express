/**
 * 11月。ディワーリー。
 *
 * 磨いた戸口に米粉の模様を描き、灯明をずらりと並べる。空には花火、
 * 帳簿は締めて新しいものを開き、金がひと晩じゅう動く。
 */
export function India07() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 花火の夜 */}
      <rect width="400" height="210" fill="#1b1f3a" />
      <g className="i07-burst-a" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M76,44 l0,-22" />
        <path d="M76,44 l16,-16" />
        <path d="M76,44 l22,0" />
        <path d="M76,44 l16,16" />
        <path d="M76,44 l0,22" />
        <path d="M76,44 l-16,16" />
        <path d="M76,44 l-22,0" />
        <path d="M76,44 l-16,-16" />
      </g>
      <g className="i07-burst-b" stroke="#e8447a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M214,32 l0,-24" />
        <path d="M214,32 l17,-17" />
        <path d="M214,32 l24,0" />
        <path d="M214,32 l17,17" />
        <path d="M214,32 l0,24" />
        <path d="M214,32 l-17,17" />
        <path d="M214,32 l-24,0" />
        <path d="M214,32 l-17,-17" />
      </g>
      <g className="i07-burst-c" stroke="#8fc4e8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M330,52 l0,-20" />
        <path d="M330,52 l14,-14" />
        <path d="M330,52 l20,0" />
        <path d="M330,52 l14,14" />
        <path d="M330,52 l0,20" />
        <path d="M330,52 l-14,14" />
        <path d="M330,52 l-20,0" />
        <path d="M330,52 l-14,-14" />
      </g>

      {/* 家の正面 */}
      <rect x="28" y="72" width="344" height="10" fill="#6b3f28" />
      <rect x="36" y="82" width="328" height="98" fill="#9c6a44" />
      <rect x="36" y="82" width="328" height="6" fill="#7a4f32" />
      <g fill="#7a4f32">
        <rect x="60" y="104" width="34" height="30" rx="3" />
        <rect x="306" y="104" width="34" height="30" rx="3" />
      </g>
      <g fill="#f5e2a8" opacity="0.85">
        <rect x="66" y="110" width="22" height="18" />
        <rect x="312" y="110" width="22" height="18" />
      </g>

      {/* 戸口 */}
      <path d="M154,180 L154,124 Q200,84 246,124 L246,180 z" fill="#6b3f28" />
      <path d="M162,180 L162,128 Q200,94 238,128 L238,180 z" fill="#f5e2a8" />
      <path d="M172,180 L172,132 Q200,104 228,132 L228,180 z" fill="#f5b31c" />

      {/* 戸口のトーラン */}
      <g className="i07-toran">
        <path d="M150,112 Q200,132 250,112" fill="none" stroke="#3a7a4a" strokeWidth="3" />
        <g fill="#f5931c">
          <circle cx="162" cy="118" r="4" />
          <circle cx="178" cy="124" r="4" />
          <circle cx="194" cy="127" r="4" />
          <circle cx="210" cy="127" r="4" />
          <circle cx="226" cy="124" r="4" />
          <circle cx="240" cy="118" r="4" />
        </g>
        <g fill="#3a7a4a">
          <path d="M170,120 l6,14 -12,0 z" />
          <path d="M202,128 l6,14 -12,0 z" />
          <path d="M234,120 l6,14 -12,0 z" />
        </g>
      </g>

      {/* 地面と沓脱ぎ */}
      <rect y="180" width="400" height="30" fill="#2f2740" />
      <rect x="140" y="176" width="120" height="8" fill="#7a6a58" />

      {/* 米粉の模様(ランゴーリ) */}
      <ellipse cx="200" cy="196" rx="48" ry="13" fill="#e8443f" />
      <ellipse cx="200" cy="196" rx="34" ry="9" fill="#f5b31c" />
      <ellipse cx="200" cy="196" rx="20" ry="5.5" fill="#5b8fe8" />
      <ellipse cx="200" cy="196" rx="8" ry="2.5" fill="#f6efe2" />
      <g fill="#f6efe2">
        <circle className="i07-dot-a" cx="200" cy="182" r="3" />
        <circle className="i07-dot-b" cx="234" cy="187" r="3" />
        <circle className="i07-dot-c" cx="252" cy="196" r="3" />
        <circle className="i07-dot-d" cx="234" cy="205" r="3" />
        <circle className="i07-dot-e" cx="200" cy="208" r="3" />
        <circle className="i07-dot-f" cx="166" cy="205" r="3" />
        <circle className="i07-dot-g" cx="148" cy="196" r="3" />
        <circle className="i07-dot-h" cx="166" cy="187" r="3" />
      </g>

      {/* 並んだ灯明 */}
      <g fill="#b5632f">
        <ellipse cx="150" cy="174" rx="8" ry="4" />
        <ellipse cx="176" cy="174" rx="8" ry="4" />
        <ellipse cx="224" cy="174" rx="8" ry="4" />
        <ellipse cx="250" cy="174" rx="8" ry="4" />
        <ellipse cx="104" cy="190" rx="9" ry="4.5" />
        <ellipse cx="296" cy="190" rx="9" ry="4.5" />
      </g>
      <g fill="#f5e2a8">
        <ellipse className="i07-flame-a" cx="150" cy="166" rx="3.2" ry="6.5" />
        <ellipse className="i07-flame-b" cx="176" cy="166" rx="3.2" ry="6.5" />
        <ellipse className="i07-flame-c" cx="224" cy="166" rx="3.2" ry="6.5" />
        <ellipse className="i07-flame-d" cx="250" cy="166" rx="3.2" ry="6.5" />
        <ellipse className="i07-flame-e" cx="104" cy="181" rx="3.6" ry="7.5" />
        <ellipse className="i07-flame-f" cx="296" cy="181" rx="3.6" ry="7.5" />
      </g>

      {/* 締めた帳簿と動く金 */}
      <rect x="42" y="160" width="58" height="6" fill="#6b4a2a" />
      <rect x="48" y="166" width="6" height="18" fill="#5a3d22" />
      <rect x="88" y="166" width="6" height="18" fill="#5a3d22" />
      <g className="i07-ledger">
        <rect x="46" y="142" width="50" height="18" rx="2" fill="#c93a3a" />
        <rect x="46" y="142" width="50" height="5" fill="#f5b31c" />
        <rect x="52" y="150" width="38" height="3" fill="#e8b8b8" />
        <rect x="52" y="156" width="26" height="3" fill="#e8b8b8" />
      </g>
      <g fill="#f5b31c">
        <g className="i07-coin-a">
          <circle cx="70" cy="132" r="7" />
          <circle cx="70" cy="132" r="3.4" fill="#e09a10" />
        </g>
        <g className="i07-coin-b">
          <circle cx="52" cy="128" r="6" />
          <circle cx="52" cy="128" r="3" fill="#e09a10" />
        </g>
        <g className="i07-coin-c">
          <circle cx="88" cy="126" r="5.5" />
          <circle cx="88" cy="126" r="2.6" fill="#e09a10" />
        </g>
      </g>

      {/* 舞い落ちる火の粉 */}
      <g fill="#f5b31c">
        <circle className="i07-spark-a" cx="118" cy="70" r="2.4" />
        <circle className="i07-spark-b" cx="268" cy="60" r="2.4" />
        <circle className="i07-spark-c" cx="356" cy="86" r="2.4" />
        <circle className="i07-spark-d" cx="20" cy="60" r="2.4" />
      </g>

      <style>{`
        .i07-burst-a, .i07-burst-b, .i07-burst-c {
          transform-box: fill-box;
          transform-origin: center;
          animation: i07-pop 2.6s ease-out infinite;
        }
        .i07-burst-b { animation-duration: 3.2s; animation-delay: -1.1s; }
        .i07-burst-c { animation-duration: 2.9s; animation-delay: -2s; }
        .i07-toran { transform-box: fill-box; transform-origin: 50% 0; animation: i07-sway 3.4s ease-in-out infinite; }
        .i07-dot-a, .i07-dot-b, .i07-dot-c, .i07-dot-d,
        .i07-dot-e, .i07-dot-f, .i07-dot-g, .i07-dot-h {
          transform-box: fill-box;
          transform-origin: center;
          animation: i07-chase 2.4s ease-in-out infinite;
        }
        .i07-dot-b { animation-delay: -0.3s; }
        .i07-dot-c { animation-delay: -0.6s; }
        .i07-dot-d { animation-delay: -0.9s; }
        .i07-dot-e { animation-delay: -1.2s; }
        .i07-dot-f { animation-delay: -1.5s; }
        .i07-dot-g { animation-delay: -1.8s; }
        .i07-dot-h { animation-delay: -2.1s; }
        .i07-flame-a, .i07-flame-b, .i07-flame-c,
        .i07-flame-d, .i07-flame-e, .i07-flame-f {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: i07-burn 1.2s ease-in-out infinite;
        }
        .i07-flame-b { animation-delay: -0.2s; }
        .i07-flame-c { animation-delay: -0.4s; }
        .i07-flame-d { animation-delay: -0.6s; }
        .i07-flame-e { animation-delay: -0.8s; animation-duration: 1.5s; }
        .i07-flame-f { animation-delay: -1s; animation-duration: 1.4s; }
        .i07-ledger { transform-box: fill-box; transform-origin: 0 100%; animation: i07-open 3s ease-in-out infinite; }
        .i07-coin-a { animation: i07-rise 2.4s ease-out infinite; }
        .i07-coin-b { animation: i07-rise 2.4s ease-out infinite; animation-delay: -0.8s; }
        .i07-coin-c { animation: i07-rise 2.4s ease-out infinite; animation-delay: -1.6s; }
        .i07-spark-a { animation: i07-drift 4.4s linear infinite; }
        .i07-spark-b { animation: i07-drift 5.2s linear infinite; animation-delay: -1.8s; }
        .i07-spark-c { animation: i07-drift 4.8s linear infinite; animation-delay: -3.2s; }
        .i07-spark-d { animation: i07-drift 5.6s linear infinite; animation-delay: -2.4s; }
        @keyframes i07-pop {
          0% { transform: scale(0.2); opacity: 0; }
          14% { opacity: 1; }
          70% { opacity: 0.9; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes i07-sway {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes i07-chase {
          0%, 100% { transform: scale(0.7); opacity: 0.5; }
          50% { transform: scale(1.35); opacity: 1; }
        }
        @keyframes i07-burn {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.74, 1.26); }
        }
        @keyframes i07-open {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg) translateY(-3px); }
        }
        @keyframes i07-rise {
          0% { transform: translate(0, 8px) scale(0.7); opacity: 0; }
          20% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(6px, -34px) scale(1); opacity: 0; }
        }
        @keyframes i07-drift {
          0% { transform: translate(0, -18px); opacity: 0; }
          20%, 70% { opacity: 1; }
          100% { transform: translate(-14px, 66px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i07-burst-a, .i07-burst-b, .i07-burst-c, .i07-toran,
          .i07-dot-a, .i07-dot-b, .i07-dot-c, .i07-dot-d,
          .i07-dot-e, .i07-dot-f, .i07-dot-g, .i07-dot-h,
          .i07-flame-a, .i07-flame-b, .i07-flame-c, .i07-flame-d,
          .i07-flame-e, .i07-flame-f, .i07-ledger,
          .i07-coin-a, .i07-coin-b, .i07-coin-c,
          .i07-spark-a, .i07-spark-b, .i07-spark-c, .i07-spark-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
