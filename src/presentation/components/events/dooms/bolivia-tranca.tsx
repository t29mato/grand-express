/**
 * 検問所(トランカ)の通行料。
 *
 * 何もない道端に突然ゲートが現れ、係官が手を出す。
 *   - 赤白の遮断バーは下りたまま、小さく揺れて上がらない
 *   - 旅人の財布から硬貨が係官の手のひらへ飛んでいく
 *   - 後ろの二人はもう領収証を持っていて、ひらひらさせている
 */
export function BoliviaTranca() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高原の空 */}
      <rect width="400" height="210" fill="#4a6280" />
      <rect y="64" width="400" height="20" fill="#5d7794" />
      <g fill="#3b4d68">
        <path d="M0,110 L52,60 L104,110z" />
        <path d="M86,110 L150,54 L214,110z" />
        <path d="M196,110 L248,66 L300,110z" />
        <path d="M286,110 L344,58 L400,110z" />
      </g>
      <g fill="#cfdbe6">
        <path d="M138,68 L150,54 L162,68 L154,64 L146,66z" />
        <path d="M334,72 L344,58 L356,72 L348,68 L340,70z" />
      </g>

      {/* 荒地と道 */}
      <rect y="108" width="400" height="102" fill="#6b5a44" />
      <g fill="#5c4d3a">
        <ellipse cx="66" cy="120" rx="30" ry="6" />
        <ellipse cx="246" cy="118" rx="26" ry="6" />
      </g>
      <rect y="130" width="400" height="58" fill="#453c31" />
      <rect y="130" width="400" height="3" fill="#5b4f40" />
      <rect y="186" width="400" height="24" fill="#5c4d3a" />

      {/* 検問小屋 */}
      <g>
        <rect x="324" y="94" width="76" height="86" fill="#c98a5e" />
        <rect x="324" y="94" width="76" height="8" fill="#a8704a" />
        <rect x="316" y="84" width="84" height="12" rx="2" fill="#8a8279" />
        <g fill="#6e6760">
          <rect x="324" y="84" width="4" height="12" />
          <rect x="342" y="84" width="4" height="12" />
          <rect x="360" y="84" width="4" height="12" />
          <rect x="378" y="84" width="4" height="12" />
        </g>
        <rect x="336" y="112" width="46" height="32" fill="#2b3a4a" />
        <rect x="332" y="144" width="54" height="6" fill="#a8704a" />
        <rect x="344" y="156" width="26" height="24" fill="#5a3f2c" />
        <rect x="330" y="40" width="4" height="46" fill="#8a8279" />
        <g className="trn-flag">
          <rect x="334" y="40" width="30" height="7" fill="#e05252" />
          <rect x="334" y="47" width="30" height="7" fill="#f5b31c" />
          <rect x="334" y="54" width="30" height="7" fill="#2f8f5b" />
        </g>
      </g>

      {/* 遮断バー */}
      <rect x="308" y="94" width="10" height="88" fill="#d8d4c8" />
      <g fill="#e05252">
        <rect x="308" y="112" width="10" height="10" />
        <rect x="308" y="142" width="10" height="10" />
      </g>
      <rect x="166" y="108" width="7" height="74" fill="#8a8279" />
      <g className="trn-bar">
        <rect x="164" y="100" width="150" height="10" rx="2" fill="#f6efe2" />
        <g fill="#e05252">
          <rect x="164" y="100" width="19" height="10" />
          <rect x="202" y="100" width="19" height="10" />
          <rect x="240" y="100" width="19" height="10" />
          <rect x="278" y="100" width="19" height="10" />
        </g>
      </g>

      {/* 係官 */}
      <g transform="translate(258,186)">
        <rect x="-11" y="-22" width="9" height="22" rx="4" fill="#2a3446" />
        <rect x="2" y="-22" width="9" height="22" rx="4" fill="#2a3446" />
        <rect x="-13" y="-52" width="26" height="32" rx="7" fill="#3f5a78" />
        <rect x="-13" y="-38" width="26" height="5" fill="#2a3446" />
        <circle cx="0" cy="-60" r="11" fill="#c98a5e" />
        <path d="M-12,-62 a12,12 0 0 1 24,0z" fill="#2a3446" />
        <rect x="-16" y="-64" width="32" height="5" rx="2" fill="#1e2836" />
        {/* 差し出す手 */}
        <g className="trn-palm">
          <rect x="-34" y="-47" width="24" height="9" rx="4" fill="#3f5a78" />
          <path d="M-33,-48 a10,10 0 0 0 0,14 L-46,-36 a3,3 0 0 1 0,-10z" fill="#c98a5e" />
        </g>
        {/* 領収証の綴り */}
        <g className="trn-pad">
          <rect x="10" y="-44" width="8" height="20" rx="3" fill="#3f5a78" />
          <rect x="12" y="-52" width="20" height="16" rx="2" fill="#f6efe2" />
          <rect x="12" y="-52" width="20" height="4" fill="#e05252" />
        </g>
      </g>

      {/* 支払う旅人 */}
      <g transform="translate(158,190)">
        <rect x="-10" y="-20" width="8" height="20" rx="3" fill="#2e2a38" />
        <rect x="2" y="-20" width="8" height="20" rx="3" fill="#2e2a38" />
        <rect x="-12" y="-48" width="24" height="30" rx="7" fill="#f5b31c" />
        <circle cx="0" cy="-56" r="11" fill="#f6efe2" />
        <path d="M-12,-58 a12,12 0 0 1 24,0z" fill="#5a4230" />
        <rect x="10" y="-44" width="18" height="7" rx="3" fill="#f5b31c" transform="rotate(-18 19 -40)" />
        <g className="trn-purse">
          <rect x="22" y="-56" width="18" height="14" rx="3" fill="#8a4a3f" />
          <rect x="22" y="-52" width="18" height="4" fill="#6b382f" />
        </g>
      </g>

      {/* 飛んでいく硬貨 */}
      <g fill="#f5b31c">
        <circle className="trn-coin trn-coin-a" cx="200" cy="142" r="7" />
        <circle className="trn-coin trn-coin-b" cx="200" cy="142" r="6" />
        <circle className="trn-coin trn-coin-c" cx="200" cy="142" r="5" />
      </g>

      {/* 領収証を持つ先客 */}
      <g transform="translate(48,192)">
        <rect x="-10" y="-20" width="8" height="20" rx="3" fill="#4a3f52" />
        <rect x="2" y="-20" width="8" height="20" rx="3" fill="#4a3f52" />
        <rect x="-12" y="-46" width="24" height="28" rx="7" fill="#3f6bb0" />
        <circle cx="0" cy="-54" r="11" fill="#c98a5e" />
        <path d="M-12,-56 a12,12 0 0 1 24,0z" fill="#2a2028" />
        <rect x="-17" y="-64" width="34" height="6" rx="3" fill="#2a2028" />
        <rect x="10" y="-58" width="8" height="18" rx="4" fill="#3f6bb0" transform="rotate(28 14 -49)" />
        <g className="trn-slip trn-slip-a">
          <rect x="16" y="-76" width="17" height="13" rx="2" fill="#f6efe2" />
          <rect x="16" y="-76" width="17" height="4" fill="#e05252" />
        </g>
      </g>
      <g transform="translate(102,190)">
        <rect x="-10" y="-20" width="8" height="20" rx="3" fill="#3a2f26" />
        <rect x="2" y="-20" width="8" height="20" rx="3" fill="#3a2f26" />
        <rect x="-12" y="-46" width="24" height="28" rx="7" fill="#8a4a3f" />
        <circle cx="0" cy="-54" r="11" fill="#c98a5e" />
        <path d="M-12,-56 a12,12 0 0 1 24,0z" fill="#2a2028" />
        <rect x="-14" y="-64" width="28" height="6" rx="3" fill="#2f8f5b" />
        <rect x="-18" y="-58" width="8" height="18" rx="4" fill="#8a4a3f" transform="rotate(-28 -14 -49)" />
        <g className="trn-slip trn-slip-b">
          <rect x="-34" y="-76" width="17" height="13" rx="2" fill="#f6efe2" />
          <rect x="-34" y="-76" width="17" height="4" fill="#e05252" />
        </g>
      </g>

      <style>{`
        .trn-bar { transform-box: fill-box; transform-origin: 100% 50%; animation: trn-judder 3s ease-in-out infinite; }
        .trn-palm { transform-box: fill-box; transform-origin: 100% 50%; animation: trn-beckon 1.5s ease-in-out infinite; }
        .trn-pad { transform-box: fill-box; transform-origin: 50% 100%; animation: trn-stamp 2.4s ease-in-out infinite; }
        .trn-purse { transform-box: fill-box; transform-origin: 50% 100%; animation: trn-shake 1.5s ease-in-out infinite; }
        .trn-coin { transform-box: fill-box; transform-origin: 50% 50%; }
        .trn-coin-a { animation: trn-pay 1.8s ease-in-out infinite; }
        .trn-coin-b { animation: trn-pay 1.8s ease-in-out infinite; animation-delay: -0.6s; }
        .trn-coin-c { animation: trn-pay 1.8s ease-in-out infinite; animation-delay: -1.2s; }
        .trn-slip { transform-box: fill-box; transform-origin: 50% 100%; }
        .trn-slip-a { animation: trn-flutter 2.2s ease-in-out infinite; }
        .trn-slip-b { animation: trn-flutter 2.2s ease-in-out infinite; animation-delay: -1.1s; }
        .trn-flag { transform-box: fill-box; transform-origin: 0 50%; animation: trn-wave 1.9s ease-in-out infinite; }
        @keyframes trn-judder {
          0%, 100% { transform: rotate(0deg); }
          42% { transform: rotate(-2.2deg); }
          70% { transform: rotate(0.8deg); }
        }
        @keyframes trn-beckon {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5px, -4px); }
        }
        @keyframes trn-stamp {
          0%, 100% { transform: rotate(0deg); }
          46% { transform: rotate(-13deg); }
        }
        @keyframes trn-shake {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-11deg); }
        }
        @keyframes trn-pay {
          0% { transform: translate(-38px, 4px) scale(0.7); opacity: 0; }
          20% { opacity: 1; }
          50% { transform: translate(0, -14px) scale(1); }
          85% { opacity: 1; }
          100% { transform: translate(42px, 2px) scale(0.7); opacity: 0; }
        }
        @keyframes trn-flutter {
          0%, 100% { transform: rotate(-9deg) skewX(4deg); }
          50% { transform: rotate(10deg) skewX(-5deg); }
        }
        @keyframes trn-wave {
          0%, 100% { transform: skewY(-5deg) scaleX(1); }
          50% { transform: skewY(6deg) scaleX(0.88); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trn-bar, .trn-palm, .trn-pad, .trn-purse, .trn-coin-a, .trn-coin-b, .trn-coin-c,
          .trn-slip-a, .trn-slip-b, .trn-flag { animation: none; }
        }
      `}</style>
    </svg>
  );
}
