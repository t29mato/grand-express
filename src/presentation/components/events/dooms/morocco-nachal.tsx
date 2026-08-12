/**
 * 夕暮れの人混みでのすり(ナシャル)。手が外ポケットから財布を抜き取り、
 * 人混みの向こうへ持ち去る。
 *
 * 動くのはすりの手と財布、周りの人影の揺れだけ。
 */
export function MoroccoNachal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの広場。 */}
      <rect width="400" height="210" fill="#3a4a68" />
      <rect y="0" width="400" height="80" fill="#5a6a88" />
      <circle cx="340" cy="40" r="18" fill="#f5b31c" opacity="0.8" />

      {/* 遠景の屋台の明かり。 */}
      <g fill="#f5b31c" opacity="0.7">
        <circle cx="60" cy="70" r="4" />
        <circle cx="100" cy="66" r="4" />
        <circle cx="300" cy="72" r="4" />
      </g>

      {/* 人混み(シルエットの群れ、少し揺れる)。 */}
      <g className="mo-nc-crowd" fill="#20304a">
        <g transform="translate(40,150)"><circle cx="0" cy="0" r="9" /><rect x="-10" y="8" width="20" height="30" rx="7" /></g>
        <g transform="translate(90,158)"><circle cx="0" cy="0" r="8" /><rect x="-9" y="7" width="18" height="28" rx="6" /></g>
        <g transform="translate(280,154)"><circle cx="0" cy="0" r="9" /><rect x="-10" y="8" width="20" height="30" rx="7" /></g>
        <g transform="translate(330,160)"><circle cx="0" cy="0" r="8" /><rect x="-9" y="7" width="18" height="28" rx="6" /></g>
      </g>

      {/* 狙われる客(中央、外ポケットに財布)。 */}
      <g transform="translate(190,150)">
        <circle cx="0" cy="0" r="10" fill="#f6efe2" />
        <rect x="-12" y="9" width="24" height="34" rx="8" fill="#8a5a34" />
        <rect className="mo-nc-wallet" x="6" y="20" width="10" height="14" rx="1.4" fill="#5a4630" />
      </g>

      {/* すりの手(伸びてきて財布を抜く)。 */}
      <g className="mo-nc-hand">
        <rect x="228" y="164" width="26" height="6" rx="3" fill="#c98a5a" />
        <circle cx="256" cy="167" r="6" fill="#c98a5a" />
      </g>

      {/* 抜き取られる財布(手と一緒に離れていく)。 */}
      <rect className="mo-nc-taken" x="6" y="20" width="10" height="14" rx="1.4" fill="#5a4630" />

      <style>{`
        .mo-nc-crowd > g {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-nc-sway 2.4s ease-in-out infinite;
        }
        .mo-nc-crowd > g:nth-child(2) { animation-delay: 0.4s; }
        .mo-nc-crowd > g:nth-child(3) { animation-delay: 0.8s; }
        .mo-nc-crowd > g:nth-child(4) { animation-delay: 1.2s; }
        @keyframes mo-nc-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .mo-nc-hand {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          opacity: 0;
          animation: mo-nc-reach 2.8s linear infinite;
        }
        @keyframes mo-nc-reach {
          0%, 20% { opacity: 0; transform: translateX(30px); }
          40% { opacity: 1; transform: translateX(0px); }
          60% { opacity: 1; transform: translateX(0px); }
          85% { opacity: 1; transform: translateX(70px); }
          100% { opacity: 0; transform: translateX(70px); }
        }
        .mo-nc-wallet {
          animation: mo-nc-fade 2.8s linear infinite;
        }
        @keyframes mo-nc-fade {
          0%, 55% { opacity: 1; }
          65%, 100% { opacity: 0; }
        }
        .mo-nc-taken {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          opacity: 0;
          animation: mo-nc-carry 2.8s linear infinite;
        }
        @keyframes mo-nc-carry {
          0%, 60% { opacity: 0; transform: translate(196px,150px); }
          65% { opacity: 1; transform: translate(240px,148px); }
          85% { opacity: 1; transform: translate(300px,140px); }
          100% { opacity: 0; transform: translate(300px,140px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-nc-crowd > g { animation: none; }
          .mo-nc-hand { animation: none; opacity: 1; transform: translateX(0px); }
          .mo-nc-wallet { animation: none; opacity: 0; }
          .mo-nc-taken { animation: none; opacity: 1; transform: translate(240px,148px); }
        }
      `}</style>
    </svg>
  );
}
