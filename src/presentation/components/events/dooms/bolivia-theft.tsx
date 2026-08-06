/**
 * エル・ティーオの盗み。
 *
 * 誰も見ていないすきに、岩の割れ目から手が伸びてチュスパ(コカ入れの袋)を探る。
 *   - 旅人はリャマのほうを向いていて気づかない
 *   - 割れ目の奥では金色の目がまばたきしている
 *   - 硬貨が袋から浮き上がって、暗がりへ吸い込まれていく
 */
export function BoliviaTheft() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜 */}
      <rect width="400" height="210" fill="#232a40" />
      <g fill="#f2efdc">
        <circle className="thf-star thf-star-a" cx="46" cy="30" r="2.5" />
        <circle className="thf-star thf-star-b" cx="96" cy="54" r="2" />
        <circle className="thf-star thf-star-c" cx="142" cy="24" r="2" />
        <circle className="thf-star thf-star-d" cx="188" cy="46" r="2.5" />
      </g>
      <g fill="#2c3450">
        <path d="M0,140 L48,96 L96,140z" />
        <path d="M78,140 L134,88 L190,140z" />
      </g>

      {/* 岩肌 */}
      <path d="M198,210 L206,124 L236,74 L282,42 L338,26 L400,18 L400,210z" fill="#33262e" />
      <path d="M198,210 L206,124 L236,74 L246,72 L224,128 L218,210z" fill="#3f2f38" />

      {/* 岩の割れ目 */}
      <path
        d="M300,52 C324,78 328,112 318,142 C312,162 294,176 278,170 C260,162 256,134 264,108 C272,80 286,62 300,52z"
        fill="#120d12"
      />

      {/* 割れ目の奥のエル・ティーオ */}
      <g fill="#3a2a36">
        <path d="M278,140 a15,15 0 0 1 30,0z" />
        <path d="M280,116 L274,100 L290,112z" />
        <path d="M306,116 L312,100 L296,112z" />
      </g>
      <g>
        <ellipse className="thf-eye thf-eye-a" cx="286" cy="124" rx="5" ry="5" fill="#f5b31c" />
        <ellipse className="thf-eye thf-eye-b" cx="300" cy="124" rx="5" ry="5" fill="#f5b31c" />
        <circle cx="287" cy="125" r="2" fill="#241a10" />
        <circle cx="301" cy="125" r="2" fill="#241a10" />
      </g>

      {/* 地面 */}
      <rect y="176" width="400" height="34" fill="#3b3226" />
      <rect y="176" width="400" height="4" fill="#4c4030" />
      <g fill="#332b21">
        <ellipse cx="86" cy="192" rx="34" ry="7" />
        <ellipse cx="250" cy="198" rx="30" ry="6" />
      </g>

      {/* 気づいていない旅人 */}
      <g transform="translate(152,190)">
        <rect x="-11" y="-22" width="9" height="22" rx="4" fill="#2e2a38" />
        <rect x="2" y="-22" width="9" height="22" rx="4" fill="#2e2a38" />
        <rect x="-14" y="-54" width="28" height="34" rx="8" fill="#f5b31c" />
        <path d="M-14,-50 L14,-42 L14,-36 L-14,-44z" fill="#c98a1c" />
        <circle cx="-2" cy="-64" r="12" fill="#f6efe2" />
        <path d="M2,-76 a12,12 0 0 1 8,12 L2,-64z" fill="#5a4230" />
        <path d="M-14,-66 a12,12 0 0 1 24,-4 L10,-64z" fill="#5a4230" />
        <circle cx="-9" cy="-64" r="2" fill="#3b2f2a" />
        <path d="M-14,-62 l-4,2 l4,2z" fill="#f6efe2" />
        <rect x="-26" y="-48" width="10" height="22" rx="5" fill="#f5b31c" transform="rotate(12 -21 -37)" />
      </g>

      {/* チュスパ(コカ入れ) */}
      <g className="thf-bag">
        <rect x="168" y="140" width="30" height="26" rx="3" fill="#c9c4b4" />
        <rect x="168" y="145" width="30" height="5" fill="#e05252" />
        <rect x="168" y="152" width="30" height="5" fill="#f5b31c" />
        <rect x="168" y="159" width="30" height="5" fill="#2f8f5b" />
        <g fill="#e05252">
          <rect x="171" y="166" width="4" height="9" rx="2" />
          <rect x="181" y="166" width="4" height="9" rx="2" />
          <rect x="191" y="166" width="4" height="9" rx="2" />
        </g>
      </g>

      {/* 割れ目から伸びる手 */}
      <g className="thf-arm">
        <path d="M280,142 L276,156 L216,150 L216,138z" fill="#2a1c26" />
        <rect x="202" y="130" width="20" height="22" rx="8" fill="#2a1c26" />
        <g fill="#2a1c26">
          <rect x="186" y="128" width="22" height="7" rx="3.5" transform="rotate(-10 197 131)" />
          <rect x="186" y="138" width="22" height="7" rx="3.5" />
          <rect x="188" y="147" width="20" height="7" rx="3.5" transform="rotate(9 198 150)" />
        </g>
      </g>

      {/* 吸い込まれる硬貨 */}
      <g fill="#f5b31c">
        <circle className="thf-coin thf-coin-a" cx="222" cy="126" r="7" />
        <circle className="thf-coin thf-coin-b" cx="222" cy="126" r="6" />
        <circle className="thf-coin thf-coin-c" cx="222" cy="126" r="5" />
      </g>

      {/* 旅人が見ているリャマ */}
      <g transform="translate(72,186)">
        <g fill="#2e2a38">
          <rect x="-22" y="-18" width="8" height="20" rx="3" />
          <rect x="-8" y="-18" width="8" height="20" rx="3" />
          <rect x="10" y="-18" width="8" height="20" rx="3" />
          <rect x="22" y="-18" width="8" height="20" rx="3" />
        </g>
        <ellipse cx="4" cy="-30" rx="30" ry="17" fill="#e0d2b4" />
        <rect x="20" y="-64" width="14" height="36" rx="7" fill="#e0d2b4" />
        <ellipse cx="30" cy="-70" rx="12" ry="9" fill="#e0d2b4" />
        <circle cx="36" cy="-70" r="2" fill="#3b2f2a" />
        <path className="thf-ear-a" d="M24,-78 L26,-90 L30,-78z" fill="#e0d2b4" />
        <path className="thf-ear-b" d="M33,-78 L37,-90 L39,-78z" fill="#e0d2b4" />
        <path className="thf-tail" d="M-28,-38 L-38,-44 L-34,-30z" fill="#e0d2b4" />
        <rect x="-14" y="-44" width="30" height="9" rx="3" fill="#e05252" />
      </g>

      <style>{`
        .thf-arm { transform-box: fill-box; transform-origin: 100% 50%; animation: thf-reach 3.4s ease-in-out infinite; }
        .thf-bag { transform-box: fill-box; transform-origin: 50% 0; animation: thf-jiggle 3.4s ease-in-out infinite; }
        .thf-eye { transform-box: fill-box; transform-origin: 50% 50%; }
        .thf-eye-a { animation: thf-blink 3.8s ease-in-out infinite; }
        .thf-eye-b { animation: thf-blink 3.8s ease-in-out infinite; animation-delay: 0.06s; }
        .thf-coin { transform-box: fill-box; transform-origin: 50% 50%; }
        .thf-coin-a { animation: thf-drift 2.6s ease-in-out infinite; }
        .thf-coin-b { animation: thf-drift 2.6s ease-in-out infinite; animation-delay: -0.9s; }
        .thf-coin-c { animation: thf-drift 2.6s ease-in-out infinite; animation-delay: -1.8s; }
        .thf-ear-a { transform-box: fill-box; transform-origin: 50% 100%; animation: thf-flick 2.8s ease-in-out infinite; }
        .thf-ear-b { transform-box: fill-box; transform-origin: 50% 100%; animation: thf-flick 2.8s ease-in-out infinite; animation-delay: -1.4s; }
        .thf-tail { transform-box: fill-box; transform-origin: 100% 50%; animation: thf-swish 2.2s ease-in-out infinite; }
        .thf-star-a { animation: thf-twinkle 3s ease-in-out infinite; }
        .thf-star-b { animation: thf-twinkle 3s ease-in-out infinite; animation-delay: -0.8s; }
        .thf-star-c { animation: thf-twinkle 3s ease-in-out infinite; animation-delay: -1.5s; }
        .thf-star-d { animation: thf-twinkle 3s ease-in-out infinite; animation-delay: -2.2s; }
        @keyframes thf-reach {
          0%, 100% { transform: translate(14px, -6px); }
          30%, 78% { transform: translate(0, 0); }
        }
        @keyframes thf-jiggle {
          0%, 26% { transform: rotate(0deg); }
          40% { transform: rotate(5deg); }
          54% { transform: rotate(-5deg); }
          70%, 100% { transform: rotate(0deg); }
        }
        @keyframes thf-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.12); }
        }
        @keyframes thf-drift {
          0% { transform: translate(-26px, 26px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(46px, -8px) scale(0.7); opacity: 0; }
        }
        @keyframes thf-flick {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes thf-swish {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(12deg); }
        }
        @keyframes thf-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .thf-arm, .thf-bag, .thf-eye-a, .thf-eye-b, .thf-coin-a, .thf-coin-b, .thf-coin-c,
          .thf-ear-a, .thf-ear-b, .thf-tail, .thf-star-a, .thf-star-b, .thf-star-c,
          .thf-star-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
